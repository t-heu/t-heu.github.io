const Minicalc = document.querySelector('#mini');
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === 'add')
    return {
    calR : firstNum + secondNum,
    sinal : "+"
  };
  if (operator === 'subtract')
    return {
    calR : firstNum - secondNum,
    sinal : "-"
  };
  if (operator === 'multiply')
    return {
    calR : firstNum * secondNum,
    sinal : "×"
  };
  if (operator === 'divide')
    return {
    calR : firstNum / secondNum,
    sinal : "÷"
  }
  if (operator === 'squad')
    return {
    calR : Math.sqrt(firstNum),
    sinal : "√"
  };
  if (operator === 'powerx')
    return {
    calR : Math.pow(firstNum, secondNum),
    sinal: "^"
  };
  if (operator === 'porc')
    return {
    calR : firstNum / 100,
    sinal : "%"
  };
};

const recebe = function(a,b,c=0) {
  let cal = calculate(a, b, c)
  const { calR, sinal } = cal
  //console.log(`${a} ${sinal} ${c} = ${calR}`)
  if(sinal == '√') {
    Minicalc.innerText = `${sinal} ${a} = ${calR}`
  } else if(sinal == '%') {
    Minicalc.innerText = `${a}${sinal} = ${calR}`
  } else {
    Minicalc.innerText = `${a} ${sinal} ${c} = ${calR}`
  }
  return calR
}

const getKeyType = key => {
  const { action } = key.dataset;
  if (!action) return 'number';
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide' ||
    action === 'squad' ||
    action === 'powerx' ||
    action === 'porc'
  ) return 'operator';
  
  /* Para todos resto, retorne a ação */
  return action;
};

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } = state;
  
  if (keyType === 'number') {
    return displayedNum === '0' ||
    previousKeyType === 'operator' ||
    previousKeyType === 'calculate'
    ? keyContent
      : displayedNum + keyContent;
  }
  
  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.';
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
    return displayedNum;
  }
  
  if (keyType === 'operator') {
    return firstValue && operator &&
    previousKeyType !== 'operator' &&
    previousKeyType !== 'calculate'
    ? recebe(firstValue, operator, displayedNum) : displayedNum;
  }
  
  if (keyType === 'clear') return 0;
  if (keyType === 'calculate') {
    return firstValue ? previousKeyType === 'calculate' ? calculate(displayedNum, operator, modValue) : recebe(firstValue, operator, displayedNum) : displayedNum;
  }
};

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key);
  const { firstValue, operator, modvalue, previousKeyType } = calculator.dataset;
  
  calculator.dataset.previousKeyType = keyType;
  
  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue = firstValue && operator &&
    previousKeyType !== 'operator' &&
    previousKeyType !== 'calculate' ? calculatedValue : displayedNum;
  }
  
  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate' ? modValue : displayedNum;
  }
  
  if (keyType === 'clear' && key.textContent === 'C') {
    calculator.dataset.firstValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
    
    delete calculator.dataset.firstValue;
    delete calculator.dataset.modValue;
    delete calculator.dataset.operator;
    delete calculator.dataset.previousKeyType;
    Minicalc.textContent = 0
  }
};

const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  const key = e.target;
  const displayedNum = display.textContent;
  const resultString = createResultString(key, displayedNum, calculator.dataset);
  let x = resultString.toString();
  
  updateCalculatorState(key, calculator, resultString, displayedNum);
  /* separar casas decimais */
  if (typeof x == 'string' && x.match(/(\d+[.]\d+)/) && x.length >= 5) {
    x = parseFloat(x);
    display.textContent = x.toFixed(3);
    console.log(x.toFixed(3))
  } else {
    display.textContent = x;
  }
});
