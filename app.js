(function() {
  var config = {
    apiKey: "AIzaSyA3VHtSjI8ueF8ph3QTI0FT_YCFZ5GMU6o",
    authDomain: "inspired-skill-159220.firebaseapp.com",
    databaseURL: "https://inspired-skill-159220.firebaseio.com",
    projectId: "inspired-skill-159220",
    storageBucket: "inspired-skill-159220.appspot.com",
    messagingSenderId: "544070490320"
  };
  firebase.initializeApp(config);
})();

const ul = document.getElementById("list");
const art = document.getElementsByClassName("art");
const notfound = document.getElementById("nf");
const titulos = document.getElementsByClassName("titul");

window.onload = function() {
  viewFeed();
};
/*
function btt() {
  const a = document.getElementById("b")
  
  if(a.style.width == "0px" || a.style.width == "") {
    a.style.width = "50%"
  } else {
    a.style.width = "0px"
  }
}*/

function search(valorDaPesquisa) {
  var valid = true;
  var regex = new RegExp(valorDaPesquisa, "i")
  for(let i = 0; i < titulos.length; i++) {
    
    var ValorDosTitulos = titulos[i].innerText;
    var value = art[i].style.display;
    var ValorFinalDaPesquisa = ValorDosTitulos.match(regex);
    
    if (ValorFinalDaPesquisa) {
      notfound.style.display = "none";
      art[i].style.display = "block";
    } else {
      art[i].style.display = "none";
      if (!value) valid = false;
      if (valid && i == 1) {
        notfound.style.display = "block";
      }
    }
  }
}
/*
function modeTheme() {
  localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'bright' : 'dark');
  
  if(localStorage.getItem('mode') === 'dark') {
    document.querySelector('body').classList.add('dark')
  } else {
    document.querySelector('body').classList.remove('dark')
  }
}*/

function renderLoading() {
  var load = document.createElement("div");
  load.setAttribute("class", "loader")
  ul.appendChild(load);
}

// exibi dados
function viewFeed() {
  renderLoading();
  
  firebase.database().ref("/art/").on("value", function(snapshot){
    ul.innerHTML = "";
    snapshot.forEach(function(item) {
      var div = document.createElement("div");
      var h1 = document.createElement("h1");
      var time = document.createElement("time");
      var p = document.createElement("p");
      var img = document.createElement("img")
      
      div.setAttribute('class','art');
      ul.appendChild(div);
      
      h1.setAttribute("class", "titul")
      if(item.val().img) {
        img.setAttribute("src", item.val().img)
        
        div.appendChild(img)
      }
      div.appendChild(h1);
      div.appendChild(time);
      div.appendChild(p);
      
      h1.appendChild(document.createTextNode(item.val().titulo));
      time.appendChild(document.createTextNode(item.val().datas));
      p.appendChild(document.createTextNode(item.val().text));
    });
  });
  
}