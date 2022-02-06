const form = document.getElementById("imc");
const result = document.getElementById('visor');
const kg_input = document.getElementById('campo1');
const height_input = document.getElementById('campo2');
const alertimc = document.getElementById("alert-imc");
const y = document.querySelector('.progress-ring__circle');
let imc;

function weightImc() {
  v = kg_input.value;
  v = v.replace(/\D/g,"")
  //v = v.replace(/[0-9]{12}/,"inválido"); //limita pra máximo 999.999.999,99
  //v = v.replace(/(\d{1})(\d{8})$/,"$1.$2"); //coloca ponto antes dos últimos 8 digitos
  v = v.replace(/(\d{1})(\d{1,1})$/,"$1.$2"); //coloca virgula antes dos últimos 2 digitos
  console.log(v)
  if(Number(v) > 300) {
    return
  }
  kg_input.value = v;
}

function heightImc() {
  v = height_input.value;
  v = v.replace(/\D/g,""); //permite digitar apenas números
  v = v.replace(/(\d{1})(\d{1,2})$/,"$1.$2"); //coloca virgula antes dos últimos 2 digitos
  if(Number(v) >= 10) {
    return
  }
  height_input.value = v;
}

function sendImc(text, color) {
  alertimc.style.color = color
  y.style.stroke = color
  alertimc.innerHTML = text
}
  
form.addEventListener('submit', function(e) {
  e.preventDefault();
  imc = kg.value / (Math.pow(m.value, 2));
  result.value = Number(imc.toFixed(2));
    
  function setProgress(percent) {
    const circle = document.querySelector('circle');
    const radiu = circle.r.baseVal.value;
    const circumference = radiu * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference}`
  
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }
  /* 
    radiu = 62 * 2 * 3.14 -- padrão
    circumference = 389.55748904513433 -- padrão
    offset = 389.55748904513433 - 15.224913494809691 ÷ 100 * 389.55748904513433
  */
  if (imc < 18.5) {
    sendImc("Magreza", "#00a8ff")
    setProgress(imc);
  } else if (imc >= 18.5 && imc < 24.9) {
    sendImc("Saudável", "#0b0")
    setProgress(imc)
  } else if (imc >= 25.0 && imc < 29.9) {
    sendImc("Sobrepeso", "#f1c40f")
    setProgress(imc);
  } else if (imc >= 30.0 && imc < 34.9) {
    sendImc("Obesidade, grau I", "#e67e22")
    setProgress(imc);
  } else if (imc >= 35.0 && imc < 39.9) {
    sendImc("Obesidade Severa, grau II", "red")
    setProgress(imc);
  } else {
    sendImc("Obesidade mórbida, grau III", "#CB3837")
    setProgress(imc);
  }
});