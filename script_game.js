let google_apps_script_url = "https://script.google.com/macros/s/AKfycbxNguwFWfGp7X8hBhfpmXa3sh1mUswmuS4zfgpwPoNWPO40MmMdpY88obnqGbaupY6kZQ/exec";
let currentQuestionIndex = 0;
let score = 0;

const questions = [
    { question: "問題 1.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 2 },
    { question: "問題 2.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 0 },
    { question: "問題 3.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 3 },
    { question: "問題 4.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 1 },
    { question: "問題 5.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 2 },
    { question: "問題 6.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 0 },
    { question: "問題 7.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 1 },
    { question: "問題 8.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 3 },
    { question: "問題 9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 0 },
    { question: "問題 10.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: ["選項A", "選項B", "選項C", "選項D"], correct: 2 }
];

// 在網頁載入後每三秒執行一次 topicAnwser 函數
window.onload = function () {
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

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score++;
        alert("答對了！加分！");
    } else {
        alert("答錯了！");
    }
}

function revealAnswer() {
    const correctIndex = questions[currentQuestionIndex].correct;
    document.querySelectorAll(".option-button")[correctIndex].style.backgroundColor = "#4CAF50"; // Highlight correct answer
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

function topicAnwser() {
    var DataArray = [1];  // 用一維陣列代替

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
                switch (parsedData[1 + i][currentIndex + 1]) {
                    case 0:
                        strAnwser = parsedData[1 + i][0] + ":" + "A";
                        break;
                    case 1:
                        strAnwser = parsedData[1 + i][0] + ":" + "B";
                        break;
                    case 2:
                        strAnwser = parsedData[1 + i][0] + ":" + "C";
                        break;
                    case 3:
                        strAnwser = parsedData[1 + i][0] + ":" + "D";
                        break;
                }
                const userBox = document.getElementById(`user${i}`);
                userBox.textContent = strAnwser;
                // userBox.textContent = `使用者 ${i}：` + strAnwser;
            }
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