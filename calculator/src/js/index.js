const digitNumber = document.querySelectorAll(".digit");
const showNumber = document.getElementById("total");
const operation = document.querySelectorAll(".operation");
const resetBtn = document.querySelector(".modifiers");

let firstNumber = "";
let secondNumber = "";
let calculate = "";
let totalNumber = 0;

const calculater = () => {
    switch (calculate) {
        case "/":
            totalNumber = Math.round((parseInt(firstNumber) / parseInt(secondNumber)) * 10) / 10;
            break;
        case "*":
            totalNumber = Math.round((parseInt(firstNumber) * parseInt(secondNumber)) * 10) / 10;
            break;
        case "-":
            totalNumber = Math.round((parseInt(firstNumber) - parseInt(secondNumber)) * 10) / 10;
            break;
        case "+":
            totalNumber = Math.round((parseInt(firstNumber) + parseInt(secondNumber)) * 10) / 10;
            break;
    }
    showNumber.textContent = totalNumber;
    firstNumber = totalNumber;
    secondNumber = "";
}

const handleDivideOperation = (evt) => {
    const fnOperation = evt.target.textContent;
    switch (fnOperation) {
        case "/":
            calculate = "/";
            break;
        case "X":
            calculate = "*";
            break;
        case "-":
            calculate = "-";
            break;
        case "+":
            calculate = "+";
            break;
    }
}

const handleResetNumber = () => {
    firstNumber = "";
    secondNumber = "";
    calculate = "";
    totalNumber = 0;
    showNumber.textContent = 0;
}

const handleInputNumber = (evt) => {
    if (calculate === "") {
        firstNumber += evt.target.textContent;
        showNumber.textContent = firstNumber;
    } else {
        secondNumber += evt.target.textContent;
        calculater();
    }
}

function init() {
    Array.from(digitNumber).forEach(number => number.addEventListener("click", handleInputNumber));
    Array.from(operation).forEach(item => item.addEventListener("click", handleDivideOperation));
    resetBtn.addEventListener("click", handleResetNumber);
}

init();