const digitNumber = document.querySelectorAll(".digit");
const totalNumber = document.getElementById("total");

let addNumber = "";

const handleInputNumber = (evt) => {
    addNumber += evt.target.textContent;
    totalNumber.textContent = addNumber;
}

function init() {
    Array.from(digitNumber).forEach(number => number.addEventListener("click", handleInputNumber));
}

init();