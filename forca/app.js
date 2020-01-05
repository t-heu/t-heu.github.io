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
  words: new Array(),
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
    
    for (let i = 0; i < this.word.length; i++) {
      
      content += '<input class="required" type="text" minlength="1" maxlength="1" readonly id="letter'+ i +'">';
      
      game.innerHTML = content;
    }
  },
  
  checkout: function(valor) {
    let letra = valor;
    letra = letra.toUpperCase();
    
    if (letra !== "" && this.word.indexOf(letra) !== -1) {
      
      for(let i = 0; i < inputs.length; i++) {
        if (letra == inputs[i].value) {
          erros.innerHTML = "Ja tem letra: <span>" + letra + "<span>";
          return;
        }
      }
        
      for (let i = 0; i <= this.word.length; i++) {
        let letter = this.word.indexOf(letra, i);
        let caractereHifen = this.word.indexOf("-" ,i);
        let caractereSpace = this.word.indexOf(" " ,i);
          
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
      statement_of_income.innerHTML = "GAME OVER! " + '<span> Palavra: '+ this.word +'</span>';
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
    btnReset.style.display = "inline-block";
    
    btnReset.addEventListener("click", () => {
      window.location.reload(true);
    });
  },
  
  theme: function() {
    for(let i = 0; i < inputTheme.length; i++) {
      let check = inputTheme[i].checked;
      let name = inputTheme[i].value;
      if (check === true) {
        if (name == "fruits") {
          this.words.push("KIWI","AÇAÍ","BANANA","LARANJA","GOIABA","UVA","ABACATE","GUARANÁ","ABACAXI","MORANGO","MELANCIA","CEREJA","FRAMBOESA","LIMA","TANGERINA","COCO","AMEIXA","ACEROLA","AMORA","AZEITONA","CACAU","GRAVIOLA","JACA","MANGA","MURICI","PINHA","PITANGA","PISTACHE","QUINA","SERIGUELA","TOMATE","TORANJA","UMBU","DAMASCO","FIGO","POMELO","CAJU","CIRIGUELA","CRANBERRY");
          this.start();
        } else if (name == "food") {
          this.words.push("QUEIJO","CARNE","OVO","BACON","PIZZA","LASANHA","ESTROGONOFE","SARDINHA","COXINHA","PASTEL","EMPADA","FRANGO","FEIJOADA","CUSCUZ","CHOCOLATE","ARROZ","PANQUECA","SORVETE","LEITE","PRESUNTO","QUIBE");
          this.start();
        } else if(name === "aleatorio") {
          this.words.push("PREFEITO","MURAL","PACIFICA","ARMAS","INÍCIO","GUARDA-CHUVA","TERMOSTATO","GUARDA-ROUPA","JARRO","BINGO","ESTRELA CADENTE","REGRAS","TRANSPORTE","RODA-GIGANTE","AMANHECER","EMPRESA","EMPREGO","TRABALHO","VIDA","RÁDIO","MINHA","ANO-LUZ","COUVE-FLOR","SINAL","ASTRONOMIA","ASTRONAUTA","ANCHOVA","MONTANHA-RUSSA");
          this.start();
        } else if (name === "animals") {
          this.words.push("GALINHA","GATO","PACA","ELEFANTE","PORCO","RATO","BEIJA-FLOR","URSO","GOLFINHO","CABRA","ZEBRA","GIRAFA","CAVALO","CORUJA","PELICANO","PANTERA","PINGUIM","RINOCERONTE","OVELHA","ESQUILO","CAMELO","LHAMA","PEIXE","MACACO","GORILA","MORCEGO","TATU","TARTARUGA","JABUTI","AVESTRUZ","COELHO","TIGRE","TUCANO","CANGURU","SAPO","URUBU","BALEIA","ALCE");
          this.start();
        }
      }
    }
  }
};