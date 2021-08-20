const digitNumber = document.querySelectorAll(".digit");
const showNumber = document.getElementById("total");
const operation = document.querySelectorAll(".operation");
const resetBtn = document.querySelector(".modifiers");

let firstNumber = "";
let secondNumber = "";
let calculate = "";
let totalNumber = 0;
let result = "";

const checkTypeNumber = () => {
    let checkFirst = 0;
    let checkSecond = 0;

    if (typeof firstNumber === "string" && typeof secondNumber === "string") {
        checkFirst = firstNumber.indexOf(".");
        checkSecond = secondNumber.indexOf(".");
    } else {
        checkSecond = secondNumber.indexOf(".");
    }

    if (checkFirst !== -1 || checkSecond !== -1) {
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
    } else {
        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);
    }
}

const handlecalculater = () => {
    checkTypeNumber();
    switch (calculate) {
        case "/":
            totalNumber = Math.round((firstNumber / secondNumber) * 10) / 10;
            break;
        case "X":
            totalNumber = Math.round((firstNumber * secondNumber) * 10) / 10;
            break;
        case "-":
            totalNumber = Math.round((firstNumber - secondNumber) * 10) / 10;
            break;
        case "+":
            totalNumber = Math.round((firstNumber + secondNumber) * 10) / 10;
            break;
    }
    showNumber.textContent = totalNumber;
    firstNumber = totalNumber;
    secondNumber = "";
    calculate = "";
    result = "";
}

const handleDivideOperation = (evt) => {
    if (evt.target.textContent === "=") {
        result = evt.target.textContent;
    }

    if (calculate !== "") {
        handlecalculater();
        calculate = evt.target.textContent;
    } else {
        calculate = evt.target.textContent;
    }

    if (result === "=") {
        handlecalculater()
    }
    if (secondNumber !== "") {
        handlecalculater()
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
        showNumber.textContent = secondNumber;
    }
}

function init() {
    Array.from(digitNumber).forEach(number => number.addEventListener("click", handleInputNumber));
    Array.from(operation).forEach(item => item.addEventListener("click", handleDivideOperation));
    resetBtn.addEventListener("click", handleResetNumber);
}

init();