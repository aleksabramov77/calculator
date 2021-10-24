let displayAfterCalculation = document.getElementsByClassName('after-calculation-text')[0];
let displayInputAndReturn = document.getElementsByClassName('input-and-result-text')[0];
let buttons = document.getElementsByClassName('not-empty-button');


// console.log(clicked)
// debugger
let numbers = ['0', ''], operation = '', inputLength, inputStyle = ``; resultIsPressed = true;

function clearCalculator() {
    numbers = ['0', ''], operation = '';
    displayInput()
};
function changeSign (i) {
    let indexOfMinus = numbers[i].indexOf('-')
    numbers[i] = indexOfMinus == -1 ? '-' + numbers[i]: numbers[i].slice(indexOfMinus + 1)
};
function doExpression () {
    expression = `${numbers[0]} ${operation} ${numbers[1]}`;
    displayAfterCalculation.innerHTML = expression + ' ='
    displayInputAndReturn.innerHTML = eval(expression)
};
function setInputFontSize() {
    inputLength = `${numbers[0]}${operation}${numbers[1]}`.length
    if (inputLength < 13) {
        inputStyle = ''
    }
    else {
        inputStyle = `font-size: ${845/inputLength}px`
    }
    displayInputAndReturn.setAttribute('style', `${inputStyle}`)
}
function displayInput () {
    setInputFontSize()
    displayInputAndReturn.innerHTML = numbers[0] + operation + numbers[1]
}


function getExpression(eventObject) {
    // console.log(eventObject)
    // debugger
    clicked = eventObject.currentTarget.name;
    if (resultIsPressed == true) {
        clearCalculator();
        resultIsPressed = false
    }

    if ('0123456789.'.includes(clicked)) {
        if (operation == '') numbers[0] = numbers[0] == '0' ? clicked : numbers[0] + clicked;
        else numbers[1] = numbers[1] == '' ? clicked : numbers[1] + clicked;
        displayInput ()
    }
    
    else if (clicked == '_plusmn') {
        changeSign (operation == ''? 0: 1)
        displayInput ()
    }    
    
    else if ('+-*/'.includes(clicked)) {
        if (operation =='') operation = clicked;
        displayInput ()
    }
        
    else if (clicked == '_result') {
        doExpression()
        resultIsPressed = true
    }

    else if (clicked == '_clear') {
        clearCalculator()
    }
};


for (button of buttons) button.addEventListener('click', getExpression);
