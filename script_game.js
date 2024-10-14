let google_apps_script_url = "https://script.google.com/macros/s/AKfycbzXlCaQcG0jB3yZGGhRcLQhhqkbLYMANodXEEVpEW0eKaw73e-v0Z-h6QEWdku4slXb3g/exec";
let currentQuestionIndex = 1;
let score = 0;

const questions = [
    { question: "問題 0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'B' },
    { question: "問題 1.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'C' },
    { question: "問題 2.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'A' },
    { question: "問題 3.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'D' },
    { question: "問題 4.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'A' },
    { question: "問題 5.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'C' },
    { question: "問題 6.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'A' },
    { question: "問題 7.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'B' },
    { question: "問題 8.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'D' },
    { question: "問題 9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'A' },
    { question: "問題 10.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 'B' }
];

// 在網頁載入後每三秒執行一次 topicAnwser 函數
window.onload = function () {
    resetGame();
    loadQuestion();
    // setInterval(topicAnwser, 3000); // 3000 毫秒 = 3 秒
};

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.querySelectorAll(".option-button").forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.style.backgroundColor = "#1a1a1a"; // Reset button color
    });
}

function revealAnswer() {
    const correctStr = questions[currentQuestionIndex].correct;
    var correctIndex;
    if (correctStr === "A") correctIndex = 0;
    if (correctStr === "B") correctIndex = 1;
    if (correctStr === "C") correctIndex = 2;
    if (correctStr === "D") correctIndex = 3;

    document.querySelectorAll(".option-button")[correctIndex].style.backgroundColor = "#4CAF50"; // Highlight correct answer

    // 根據 Anwser_OX 更新每位使用者的底色
    Anwser_OX.forEach((answer, index) => {
        const userBox = document.getElementById(`user${index + 1}`);
        if (answer) {
            userBox.style.backgroundColor = "#4CAF50"; // 正確答案為綠色
        } else {
            userBox.style.backgroundColor = "#F44336"; // 錯誤答案為紅色
        }
    });
}

function nextQuestion() {
    var DataArray = [2];  // 用一維陣列代替

    $.ajax({
        url: google_apps_script_url,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (data) {
            // console.log(data);
            // 將字串解析為物件
            let parsedData = JSON.parse(data);
            // console.log(parsedData.newValue);
            currentQuestionIndex = parsedData.newValue;
            if (currentQuestionIndex < questions.length) {
                // 恢復選項按鈕的背景顏色
                document.querySelectorAll(".option-button").forEach(button => {
                    button.style.backgroundColor = ""; // 恢復原色
                });

                // 恢復使用者的底色
                document.querySelectorAll(".user-box").forEach(box => {
                    box.style.backgroundColor = ""; // 恢復原色
                });
                
                loadQuestion();
            }
            // } else {
            //     currentQuestionIndex = 0;
            //     loadQuestion();
            // }
        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });
}

var Anwser_OX;
function topicAnwser() {
    var DataArray = [1];  // 用一維陣列代替
    Anwser_OX = [];
    $.ajax({
        url: google_apps_script_url,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (data) {
            loadQuestion();

            // console.log(data);
            // 將字串解析為物件
            let parsedData = JSON.parse(data);
            // console.log(parsedData);
            // console.log(parsedData[0][0]);
            // console.log(parsedData[0][1]);

            let currentIndex = parsedData[0][1];
            // 使用 for 迴圈來更新每個使用者的顯示內容
            for (let i = 1; i <= 8; i++) {
                var strAnwser = "";
                var v1 = parsedData[1 + i][currentIndex]; '答案'
                switch (v1) {
                    case 'A':
                        strAnwser = parsedData[1 + i][0] + ":" + "A";
                        break;
                    case 'B':
                        strAnwser = parsedData[1 + i][0] + ":" + "B";
                        break;
                    case 'C':
                        strAnwser = parsedData[1 + i][0] + ":" + "C";
                        break;
                    case 'D':
                        strAnwser = parsedData[1 + i][0] + ":" + "D";
                        break;
                }

                if (questions[currentIndex].correct === v1) {
                    Anwser_OX.push(true);
                }
                else {
                    Anwser_OX.push(false);
                }

                const userBox = document.getElementById(`user${i}`);
                userBox.textContent = strAnwser;
                // userBox.textContent = `使用者 ${i}：` + strAnwser;
            }
            console.log(Anwser_OX);
        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });
}

function resetGame() {
    var DataArray = [99];  // 用一維陣列代替

    $.ajax({
        url: google_apps_script_url,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (data) {
            // console.log(data);
            // 將字串解析為物件
            let parsedData = JSON.parse(data);
            console.log(parsedData);

        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });
}

var player = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8'];
var scores = [10, 20, 30, 40, 50, 60, 70, 100]; // 假設分數初始為 0，根據需要更新分數

function showScores() {

    var DataArray = [1];  // 用一維陣列代替
    player = [];
    scores = [];

    $.ajax({
        url: google_apps_script_url,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (data) {
            // console.log(data);
            // 將字串解析為物件
            let parsedData = JSON.parse(data);
            console.log(parsedData);
            for (let i = 1; i <= 8; i++) {
                player.push(parsedData[1 + i][0]);
                scores.push(parsedData[1 + i][11]);
            }

            let scoresContainer = document.getElementById('scoresContainer');
            scoresContainer.innerHTML = ""; // 清空內容

            scores.forEach((score, index) => {
                // 計算長條圖的寬度
                let barWidth = score / 100; // 假設每分數的長度為 10px
                scoresContainer.innerHTML += `
                    <div style="margin: 5px 0; display: flex; align-items: center;">
                        ${player[index]}：  <!-- 使用 player 陣列中的名稱 -->
                        <span style="margin: 0 10px;">${score}</span>
                        <div style="background: #EED202; width: ${barWidth}px; height: 20px; border-radius: 5px;"></div>
                    </div>
                `;
            });

            document.getElementById('scoreModal').style.display = 'flex'; // 顯示分數框
        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });

}

function closeScores() {
    document.getElementById('scoreModal').style.display = 'none'; // 隱藏分數框
}