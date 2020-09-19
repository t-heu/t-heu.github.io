(function () {
  var config = {
    apiKey: "AIzaSyA3VHtSjI8ueF8ph3QTI0FT_YCFZ5GMU6o",
    authDomain: "inspired-skill-159220.firebaseapp.com",
    databaseURL: "https://inspired-skill-159220.firebaseio.com",
    projectId: "inspired-skill-159220",
    storageBucket: "inspired-skill-159220.appspot.com",
    messagingSenderId: "544070490320"
  };
  firebase.initializeApp(config);
}());

const login_sucess = document.getElementById("login_sucess");
const not_login = document.getElementById("not_login");
const userlist = document.getElementById("userlist");
  
function setLoading() {
  let span = document.createElement("span");
  let h2 = document.createElement("h2");
  span.setAttribute("class", "throbber-loader");
  h2.appendChild(span);
  userlist.appendChild(h2);
}

function AppError(mes) {
  const ErroLoginSignup = document.getElementById("erro");
  ErroLoginSignup.style.display = "block";
  ErroLoginSignup.innerText = "Error: " + mes
  setTimeout(() => {
    ErroLoginSignup.style.display = "none"
  },3000);
}

// verificar se tá logado
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // User is signed in.
    if(not_login)
      window.location.replace("dash.html");
    
    const name = firebase.auth().currentUser;
    
    // console.log(firebaseUser.email)
    
    document.getElementById("user_para").innerText = firebaseUser.email;
  } else {
    // No user is signed in.
    if(login_sucess) window.location.replace("index.html");
  }
});

function crearMessageFeed() {
  const txt = document.getElementById("txt");
  try {
    if (txt.value === "") throw "Campo vazio.";
    if (txt.value.length >= 5) throw "Precisa conter 5 caracteres.";
    
    var data = {
      coment: txt.value
    }
    
    firebase.database().ref().child("feed").push(data);
    return txt.value = ''
  } catch (err) {
    AppError(err)
  }
}

// exibição
function carregaFeed() {
  setLoading();
  firebase.database().ref("feed").on("value", function(snapshot) {

    userlist.innerHTML = "";
    snapshot.forEach(item => {
      
      const sec = document.createElement("section");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const div = document.createElement("div");
      const a = document.createElement("a");
      const h3 = document.createElement("h3");
      const time = document.createElement("time");
        
      sec.setAttribute('class','cont');
      userlist.appendChild(sec);
        
      img.setAttribute('src','./assets/img/6bc.png');
      sec.appendChild(img);
        
      div.setAttribute('class','dt');
      sec.appendChild(div);
        
      a.setAttribute('href','#');
      div.appendChild(a);
        
      a.appendChild(h3);
      h3.appendChild(document.createTextNode("anonymous"));
        
      div.appendChild(time);
      time.appendChild(document.createTextNode("30s age"));
        
      sec.appendChild(p);
      p.appendChild(document.createTextNode(item.val().coment));
    });
  });
}
  
//Get elements
const userEmail = document.getElementById("email_field");
const userPass = document.getElementById("password_field");
const btnLogin = document.getElementById("login");
const btnSignup = document.getElementById("signup");

//Add Login event
const lo_si = function() {
  btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = userEmail.value;
    const pass = userPass.value;
    const auth = firebase.auth();
    
    //Sign in
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .catch(function(error) {
      AppError(error.message)
    });
  });
  
  //Add event Signup
  btnSignup.addEventListener('click', e => {
   
    //Get email and pass
    const email = userEmail.value;
    const pass = userPass.value;
    const auth = firebase.auth();
    
    try {
      if (pass === "") throw "Campo vazio";
      if (isNaN(pass)) throw "Não é um número válido";
      if (pass.length < 6) throw "Senha baixa demais";
      
      firebase.auth().createUserWithEmailAndPassword(email, pass)
    } catch(err) {
      AppError(err)
    }
  });
}

function logout() {
  firebase.auth().signOut();
}

/*
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

*/
