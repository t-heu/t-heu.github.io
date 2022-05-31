const game = document.querySelector("#game");
const statement_of_income = document.getElementById("state");
const letters_div = document.querySelector(".letras");
const erros = document.getElementById("erros");
const inputTheme = document.querySelectorAll(".theme");
const btnReset = document.getElementById("reset"); 
const initial_div = document.getElementsByClassName("main_div")[0];
const marking_div = document.getElementById("marking_div");
const inputs = document.getElementsByClassName('required');

const forca = {
  words: [],
  word: "",
  error: 0,
  
  start: function() {
    marking_div.style.display = "none";
    initial_div.style.display = "block";
    
    let num = this.words.length - 1;
    let i = Math.round(Math.random() * num);

    this.word = this.words[i];
    this.camp();
  },

  camp: function() {
    let content = "";
    
    for (let i = 0; i < this.word.name.length; i++) {
      content += '<input class="required" type="text" minlength="1" maxlength="1" readonly id="letter'+ i +'">';
      game.innerHTML = content;
    }

    statement_of_income.innerText = this.word.dica;
  },
  
  checkout: function(valor) {
    let letra = valor;
    letra = letra.toUpperCase();
    
    if (letra !== "" && this.word.name.indexOf(letra) !== -1) {
      
      for(let i = 0; i < inputs.length; i++) {
        if (letra == inputs[i].value) {
          erros.innerHTML = "Ja tem letra: <span>" + letra + "<span>";
          return;
        }
      }
        
      for (let i = 0; i <= this.word.name.length; i++) {
        let letter = this.word.name.indexOf(letra, i);
        let caractereHifen = this.word.name.indexOf("-" ,i);
        let caractereSpace = this.word.name.indexOf(" " ,i);
          
        if (caractereHifen >= 0) {
          document.getElementById('letter'+ caractereHifen).value = "-";
        }
        if (caractereSpace >= 0) {
          document.getElementById('letter'+ caractereSpace).value = " ";
        }
        if (letter >= 0) {
          document.getElementById('letter'+ letter).value = letra;
        }
      }
        
      this.winner();
    } else {
      this.lost();
    }
  },
  
  lost: function() {
    if (this.error == 5) {
      this.error += 1;
      statement_of_income.innerHTML = "GAME OVER! " + '<span> Palavra: '+ this.word.name +'</span>';
      this.restart();
    } else {
      this.error += 1;
    }
    erros.textContent = "Erros: " + this.error;
  },
  
  winner: function(letter) {
    var valid = true;
    
    for(let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) valid = false;
    }
      
    if (valid) {
      statement_of_income.textContent = "YOU WON!";
      statement_of_income.style.color = "#2ecc71";
      this.restart();
    }
  },
  
  restart: function() {
    letters_div.style.display = "none";
    btnReset.style.display = "block";
    
    btnReset.addEventListener("click", () => {
      window.location.reload(true);
    });
  },

  data: function(theme) {
    fetch("./themes.json")
    .then(response => {
      return response.json();
    })
    .then(jsondata => {
      //console.log(jsondata.themes[theme])
      this.words = jsondata.themes[theme];
      this.start();
    });
  },
  
  theme: function() {
    for(let i = 0; i < inputTheme.length; i++) {
      let check = inputTheme[i].checked;
      let theme = inputTheme[i].value;

      if (check === true) {
        this.data(theme)
      }
    }
  }
};