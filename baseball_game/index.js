// DOM 영역
const inputNumber = document.querySelector("#input");
const formNumber = document.querySelector("#form");
const showLogs = document.querySelector("#logs");

// 전역 변수
let humanInputAsnswer = ""; // 사람이 입력한 값
const correctAnswer = []; // 컴퓨터가 뽑아내는 랜덤 번호
let i = 0; // 반복문을 돌릴 떄, 중복된 값이 있을 경우 i를 빼줘야 하기 때문에 전역 변수로 처리.

let strike = 0;
let out = 0;
let ball = 0;

let ballCount = 0;
let outCount = 0;

// 결과 도출하기
const outputResult = () => {
    console.log(correctAnswer);
    if (strike >= 4) {
        alert("숫자를 맞췄습니다!!🎉");
        location.reload();
    } else if (ballCount > 10) {
        alert("10번의 기회가 사라졌습니다.😭");
        location.reload();
    } else if (outCount > 3) {
        alert("삼진 아웃!! ⚾");
        location.reload();
    }
}

// 입력받은 값을 화면상에 보여준다.

const handlePaint = (text) => {
    const resultText = document.createElement("p");
    resultText.textContent = `${humanInputAsnswer} ${text}`;
    showLogs.append(resultText);
    humanInputAsnswer = "";
}

const paintResults = () => {
    if (strike >= 1 || ball >= 1) {
        const text = `${strike}S ${ball}B`;
        ballCount++;
        handlePaint(text);
    } else {
        const text = `OUT`;
        outCount++;
        handlePaint(text);
    }
    outputResult();
    strike = 0;
    ball = 0;
    out = 0;
}

// 입력받은 값을 스트라이크, 볼, 아웃 처리하기.

const checkResults = (answer, index) => {
    let num = parseInt(humanInputAsnswer[index]);
    if (answer === num) {
        strike++;
    }
    if (answer !== num && correctAnswer.indexOf(num) !== -1) {
        ball++;
    } else {
        out++;
    }
}

const handleResults = () => {
    correctAnswer.map((answer, index) => {
        checkResults(answer, index);
    })
    paintResults();
}


// 사용자로부터 입력받은 값 중에 문자나 10이상의 수, 중복된 값 체크하기.
const checkOverlapNumber = () => {
    let checkSet = new Set();
    if (checkSet.size === 0) {
        for (let j = 0; j < humanInputAsnswer.length; j++) {
            checkSet.add(humanInputAsnswer[j]);
        }
    }
    if (checkSet.size !== 4) {
        alert("입력한 값중에 중복된 숫자가 있어요!");
        humanInputAsnswer = "";
        inputNumber.value = "";
    }
}

const checkTypeNumber = (validate) => {
    const checkNumber = Number(validate);
    const zeroNumber = validate.indexOf(0);

    if (zeroNumber !== -1 || isNaN(checkNumber) || validate.length > 4) {
        alert("게임을 진행하기 위해, 숫자 1~9사이만 입력해주세요.");
        inputNumber.focus();
    } else {
        humanInputAsnswer = validate;
    }
}

// 사용자가 번호 입력 (만약 중복된 값이 있을 경우는? 예외 처리를 해야 한다.)

const handleValidateInput = (event) => {
    event.preventDefault();
    const humanInput = inputNumber.value; // 입력받은 값을 ,을 기준으로 배열 형태로 저장
    checkTypeNumber(humanInput);
    checkOverlapNumber();
    if (humanInputAsnswer !== "") {
        inputNumber.value = "";
        handleResults();
    }
}

// 무작위 번호 중 중복된 번호를 확인
const validateNumber = (random) => {
    if (correctAnswer.indexOf(random) !== -1) {
        correctAnswer.push(random);
        correctAnswer.pop();
        i--;
    } else {
        correctAnswer.push(random);
    }
}

// 게임 시작!!
function gameStart() {
    formNumber.addEventListener("submit", handleValidateInput);
}

// 무작위로 번호 뽑기.
function makeRandomNumber() {
    for (i; i < 4; i++) {
        let random = Math.floor(Math.random() * 9 + 1);
        validateNumber(random);
    }
}

makeRandomNumber();
gameStart();