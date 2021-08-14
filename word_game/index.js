const wordForm = document.getElementById("word_form");
const wordInput = document.getElementById("word_input");

const randomWord = ["조상", "이유", "역지사지", "공부", "낙오", "인생"];
const API_KEY = "E12ACB776EEB4ADFB01C66EE3F4FC14E";

// API 요청 후, 사용자가 업릭현 단어가 사전에 있는지 확인

const handleCheckWord = (word) => {
    if (word !== "0") {
        console.log("단어가 있다.");
    } else {
        console.log("사전에 단어가 없습니다.");
    }
}

// 사용자가 입력한 단어를 API 요청

async function handleRequestApi(word) {
    let checkWord = "";

    try {
        const {
            request: {
                responseXML: { all }
            } } = await axios.get(`https://opendict.korean.go.kr/api/search?key=${API_KEY}`, {
                params: {
                    q: word,
                    advanced: "y",
                    pos: 1
                }
            });
        const findTotal = Array.from(all).filter(item => item.tagName === "total");
        checkWord = findTotal[0].textContent;
    } catch (error) {
        console.log(`에러가 발생했습니다. ${error}`);
    } finally {
        handleCheckWord(checkWord);
    }
}

// 사용자가 입력한 단어

const handleInputWord = (evt) => {
    evt.preventDefault();
    const currentWord = wordInput.value;
    handleRequestApi(currentWord);
    wordInput.value = "";
}

// 처음 시작하면 제시어 출력

const presentWord = () => {
    let i = Math.floor(Math.random() * randomWord.length);
    const startWord = randomWord[i].slice(-1);
    console.log(randomWord[i]);
    setTimeout(() => console.log(startWord), 2000);
}

function gameStart() {

    presentWord();
    wordForm.addEventListener("submit", handleInputWord);
}

gameStart();