const digitNumber = document.querySelectorAll(".digit");
const totalNumber = document.getElementById("total");
const operation = document.querySelectorAll(".operation");

let addNumber = "";

const handlecalculator = (evt) => {
    const fnOperation = evt.target.textContent;
    switch (fnOperation) {
        case "/":
            console.log("나누기");
            break;
        case "X":
            console.log("곱하기");
            break;
        case "-":
            console.log("빼기");
            break;
        case "+":
            console.log("더하기");
            break;
        case "=":
            console.log("결과");
            break;
    }
}

const handleInputNumber = (evt) => {
    addNumber += evt.target.textContent;
    totalNumber.textContent = addNumber;
}

function init() {
    Array.from(digitNumber).forEach(number => number.addEventListener("click", handleInputNumber));
    Array.from(operation).forEach(item => item.addEventListener("click", handlecalculator));
}

init();