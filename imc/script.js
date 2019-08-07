var form = document.getElementById("imc");
var Result = document.getElementById('visor');
var kg = document.getElementById('campo1');
var m = document.getElementById('campo2');
var alertimc = document.getElementById("alert-imc");
var imc;

function weightImc(){
  v = kg.value;
  v = v.replace(/\D/g,""); //permite digitar apenas números
  //v = v.replace(/[0-9]{12}/,"inválido"); //limita pra máximo 999.999.999,99
  //v = v.replace(/(\d{1})(\d{8})$/,"$1.$2"); //coloca ponto antes dos últimos 8 digitos
  v = v.replace(/(\d{1})(\d{1,1})$/,"$1.$2"); //coloca virgula antes dos últimos 2 digitos
  kg.value = v;
}

function heightImc() {
  v = m.value;
  v = v.replace(/\D/g,""); //permite digitar apenas números
  v = v.replace(/(\d{1})(\d{1,2})$/,"$1.$2"); //coloca virgula antes dos últimos 2 digitos
  m.value = v;
}
  
  form.addEventListener('submit', function(e) {
    imc = kg.value / (Math.pow(m.value, 2));
    Result.value = Number(imc.toFixed(2));
    
    const circle = document.querySelector('circle');
    const radiu = circle.r.baseVal.value;
    const circumference = radiu * 2 * Math.PI;
 
    const y = document.querySelector('.progress-ring__circle');
    
    circle.style.strokeDasharray = `${circumference}`
    
    function setProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
    }
    /* 
      radiu = 62 * 2 * 3.14 -- padrão
      circumference = 389.55748904513433 -- padrão
      offset = 389.55748904513433 - 15.224913494809691 ÷ 100 * 389.55748904513433
    */
    if (imc < 18.5) {
      alertimc.innerHTML = "Magreza";
      setProgress(imc);
      y.style.stroke = "#00a8ff";
      alertimc.style.color = "#00a8ff";
      
    } else if (imc >= 18.5 && imc < 24.9) {
      alertimc.style.color = "#0b0";
      y.style.stroke = "#0b0";
      setProgress(imc);
      alertimc.innerHTML = "Saudável";
      
    } else if (imc >= 25.0 && imc < 29.9) {
      alertimc.style.color = "#f1c40f";
      y.style.stroke = "#f1c40f";
      setProgress(imc);
      alertimc.innerHTML = "Sobrepeso";
      
    } else if (imc >= 30.0 && imc < 34.9) {
      alertimc.style.color = "#e67e22";
      y.style.stroke = "#e67e22";
      setProgress(imc);
      alertimc.innerHTML = "Obesidade <br> grau I";
      
    } else if (imc >= 35.0 && imc < 39.9) {
      alertimc.style.color = "red";
      y.style.stroke = "red";
      setProgress(imc);
      alertimc.innerHTML = "Obesidade <br> Severa <br> grau II";
      
    } else {
      alertimc.style.color = "#CB3837";
      y.style.stroke = "#CB3837";
      setProgress(imc);
      alertimc.innerHTML = "Obesidade <br> mórbida <br> grau III";
      
    }
    // impede o envio do form
    e.preventDefault();
  });