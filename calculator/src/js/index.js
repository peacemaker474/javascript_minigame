const digitNumber = document.querySelectorAll(".digit");
const showNumber = document.getElementById("total");
const operation = document.querySelectorAll(".operation");
const resetBtn = document.querySelector(".modifiers");

// 1,2 번째 숫자, 계산 결과, 사칙연산 전역변수 처리
let firstNumber = "";
let secondNumber = "";
let calculate = "";
let totalNumber = 0;
let result = "";
let numberlength = 0;

// 덧셈과 뺄셈 실수 부분 소수점 자리 제어
const changeFloatNumber = () => {
    let findDotF = firstNumber.indexOf(".");
    let countF = firstNumber.slice(findDotF + 1, -1).length;

    let findDotS = secondNumber.indexOf(".");
    let countS = secondNumber.slice(findDotS + 1, -1).length;

    if (countF > countS) {
        numberlength = countF;
    } else {
        numberlength = countS;
    }

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
}

// 정수와 실수 구분 영역
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
        changeFloatNumber();
    } else {
        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);
    }
}

// 결과 영역
const handleResults = () => {
    let changeStringNumber = String(totalNumber);

    if (changeStringNumber.indexOf(".") !== -1 && changeStringNumber.length > 15) {
        totalNumber = totalNumber.toFixed(2);
        showNumber.textContent = totalNumber;
        firstNumber = totalNumber;
    } else {
        showNumber.textContent = totalNumber;
        firstNumber = totalNumber;
    }

    secondNumber = "";
    calculate = "";
    result = "";
}

// 계산하는 영역
const handlecalculater = () => {
    checkTypeNumber();

    switch (calculate) {
        case "/":
            totalNumber = firstNumber / secondNumber;
            break;
        case "X":
            totalNumber = firstNumber * secondNumber;
            break;
        case "-":
            totalNumber = (firstNumber - secondNumber).toFixed(numberlength + 1)
            break;
        case "+":
            totalNumber = (firstNumber + secondNumber).toFixed(numberlength + 1)
            break;
    }

    handleResults();
}
// 사칙 연산 중복 체크
const checkDoubleOperation = () => {
    if (secondNumber !== "") {
        handlecalculater()
    }
}

// 사칙연산 영역
const handleDivideOperation = (evt) => {
    if (evt.target.textContent === "=") {
        result = evt.target.textContent;
    }

    if (calculate !== "") {
        checkDoubleOperation();
        calculate = evt.target.textContent;
    } else {
        calculate = evt.target.textContent;
    }

    if (result === "=") handlecalculater()
}

// 숫자 영역에서 "." 중복,  초기 0 입력 부분 유효성 검사
const checkDoubleDot = (currentNumber) => {
    if (firstNumber === "0" && currentNumber === ".") {
        firstNumber += currentNumber;
        showNumber.textContent = firstNumber;
    } else if (firstNumber === "0" && currentNumber !== ".") {
        firstNumber = currentNumber;
        showNumber.textContent = firstNumber;
    } else if (firstNumber.indexOf(".") !== -1 && currentNumber === ".") {
        return false;
    } else {
        firstNumber += currentNumber;
        showNumber.textContent = firstNumber;
    }
}

const checkSecondNumber = (currentNumber) => {
    if (secondNumber.indexOf(".") !== -1 && currentNumber === ".") {
        return false;
    } else {
        secondNumber += currentNumber;
        showNumber.textContent = secondNumber;
    }
}

const checkFirstNumber = (currentNumber) => {
    if (firstNumber === "") {
        firstNumber += currentNumber;
        showNumber.textContent = firstNumber;
    } else {
        checkDoubleDot(currentNumber);
    }
}

// 숫자 버튼 클릭 영역
const handleInputNumber = (evt) => {
    let currentNumber = evt.target.textContent;

    if (calculate === "") {
        checkFirstNumber(currentNumber);
    } else {
        checkSecondNumber(currentNumber);
    }
}

// AC 버튼 영역
const handleResetNumber = () => {
    firstNumber = "";
    secondNumber = "";
    calculate = "";
    totalNumber = 0;
    showNumber.textContent = 0;
}


function init() {
    Array.from(digitNumber).forEach(number => number.addEventListener("click", handleInputNumber));
    Array.from(operation).forEach(item => item.addEventListener("click", handleDivideOperation));
    resetBtn.addEventListener("click", handleResetNumber);
}

init();