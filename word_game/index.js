const wordForm = document.getElementById("word_form");
const wordInput = document.getElementById("word_input");
const wordLists = document.querySelector(".word_lists");
const h2 = document.querySelector("h2");

const randomWord = ["조상", "이유", "역지사지", "공부", "낙오", "인생"];
const API_KEY = "E12ACB776EEB4ADFB01C66EE3F4FC14E";
let currentWord = "";
let count = 3;

// 사전에 없는 단어를 3회이상 입력할시 게임은 종료된다.
const checkCountNum = () => {
    if (count === 0) {
        alert("주어진 기회가 더 이상 없습니다.");
    }
}

// 입력한 단어 DOM의 출력
const paintWord = (word) => {
    const li = document.createElement("li");
    li.textContent = `${word} ⏩⏩⏩ ⭐${word.slice(-1)}`;
    wordLists.append(li);
}

// API 요청 후, 사용자가 업릭현 단어가 사전에 있는지 확인
const handleCheckWord = (checkWord, addWord) => {
    if (checkWord !== "0") {
        paintWord(addWord);
        currentWord = addWord;
        count = 3;
    } else {
        alert(`사전에 단어가 없습니다. 남은 기회는 ${count}`)
        checkCountNum();
        count--;
    }
}


// 사용자가 입력한 단어를 API 요청
async function handleRequestApi(word) {
    let checkWord = "";
    let addWord = "";

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
        const sendWord = Array.from(all).filter(item => item.tagName === "word");
        checkWord = findTotal[0].textContent;
        addWord = sendWord[0].textContent;
    } catch (error) {
        console.log(`에러가 발생했습니다. ${error}`);
    } finally {
        handleCheckWord(checkWord, addWord);
    }
}

// 사용자가 입력한 단어의 끝과 입력하 단어의 앞이 같은지 확인

const checkSameWord = (word) => {
    const beforeWord = currentWord.slice(-1);
    const afterWord = word.slice(0, 1);

    if (beforeWord === afterWord) {
        handleRequestApi(word);
    } else {
        alert(`제시된 단어는 ${currentWord}입니다. '${beforeWord}'로 시작하는 단어를 입력해주세요.`);
    }
}

// 사용자가 단어 입력하기
const handleInputWord = (evt) => {
    evt.preventDefault();
    const currentValue = wordInput.value;
    checkSameWord(currentValue);
    wordInput.value = "";
}

// 처음 시작하면 제시어 출력

const presentWord = () => {
    let i = Math.floor(Math.random() * randomWord.length);
    if (currentWord === "") {
        currentWord = randomWord[i];
        h2.textContent = `첫 제시어는 🟢${currentWord}🟢입니다.`
    }
}

function gameStart() {
    presentWord();
    wordForm.addEventListener("submit", handleInputWord);
}

gameStart();