// 角色圖片對應（縮圖和大圖）
const characters = [
    { id: 1, thumb: 'img/char/1.png', large: 'img/char/1.png', alt: '角色1' },
    { id: 2, thumb: 'img/char/2.png', large: 'img/char/2.png', alt: '角色2' },
    { id: 3, thumb: 'img/char/3.png', large: 'img/char/3.png', alt: '角色3' },
    { id: 4, thumb: 'img/char/4.png', large: 'img/char/4.png', alt: '角色4' },
    { id: 5, thumb: 'img/char/5.png', large: 'img/char/5.png', alt: '角色5' },
    { id: 6, thumb: 'img/char/6.png', large: 'img/char/6.png', alt: '角色6' },
    { id: 7, thumb: 'img/char/7.png', large: 'img/char/7.png', alt: '角色7' },
    { id: 8, thumb: 'img/char/8.png', large: 'img/char/8.png', alt: '角色8' },
    { id: 9, thumb: 'img/char/9.png', large: 'img/char/9.png', alt: '角色9' },
    { id: 10, thumb: 'img/char/10.png', large: 'img/char/10.png', alt: '角色10' },
    { id: 11, thumb: 'img/char/11.png', large: 'img/char/11.png', alt: '角色11' },
    { id: 12, thumb: 'img/char/12.png', large: 'img/char/12.png', alt: '角色12' },
    { id: 13, thumb: 'img/char/13.png', large: 'img/char/13.png', alt: '角色13' },
    { id: 14, thumb: 'img/char/14.png', large: 'img/char/14.png', alt: '角色14' },
    { id: 15, thumb: 'img/char/15.png', large: 'img/char/15.png', alt: '角色15' },
    { id: 16, thumb: 'img/char/16.png', large: 'img/char/16.png', alt: '角色16' },
    { id: 17, thumb: 'img/char/17.png', large: 'img/char/17.png', alt: '角色17' },
    { id: 18, thumb: 'img/char/18.png', large: 'img/char/18.png', alt: '角色18' },
    { id: 19, thumb: 'img/char/19.png', large: 'img/char/19.png', alt: '角色19' },
    { id: 20, thumb: 'img/char/20.png', large: 'img/char/20.png', alt: '角色20' },
];
// 選中角色

let selectedBox = null;
const characterGrid = document.getElementById('character-grid');
const characterImage = document.getElementById('character-image');
const characterInfoName = document.getElementById('character-name');
const randomSound = document.getElementById('random-sound');
const selectedList = document.getElementById('selected-list');

// 動態生成角色方框
characters.forEach(character => {
    const box = document.createElement('div');
    box.classList.add('character-box');
    box.setAttribute('data-id', character.id);

    const img = document.createElement('img');
    img.src = character.thumb;
    img.alt = character.alt;

    box.appendChild(img);
    characterGrid.appendChild(box);

    // 點擊事件
    box.addEventListener('click', () => {
        // selectCharacter(character);
        randomSound.currentTime = 0; // 確保音效從頭播放
        randomSound.play(); // 播放音效

        if (selectedBox) {
            selectedBox.classList.remove('selected');
        }
        box.classList.add('selected');
        selectedBox = box;

        characterImage.src = character.large;
        characterImage.alt = `${character.alt} 大圖`;
        characterInfoName.textContent = character.alt;
    });
});

// 隨機選角
document.getElementById('random-button').addEventListener('click', () => {
    // 清除所有方框的紅框
    const allBoxes = document.querySelectorAll('.character-box');
    allBoxes.forEach(box => {
        box.classList.remove('selected');
    });

    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];
    const randomBox = document.querySelector(`.character-box[data-id="${randomCharacter.id}"]`);

    // 隨機亮起的過程
    let currentBox = null;
    const interval = setInterval(() => {
        // 移除之前的紅框
        if (currentBox) {
            currentBox.classList.remove('selected'); 
        }

        // 隨機選擇一個方框
        const randomIndex = Math.floor(Math.random() * characters.length);
        currentBox = document.querySelector(`.character-box[data-id="${characters[randomIndex].id}"]`);
        currentBox.classList.add('selected'); // 增加紅框

        randomSound.currentTime = 0; // 確保音效從頭播放
        randomSound.play(); // 播放音效
    }, 200); // 每100毫秒更新一次

    // 停止隨機亮起，並顯示最終選擇
    setTimeout(() => {
        clearInterval(interval); // 清除隨機亮起的間隔
        if (currentBox) {
            currentBox.classList.remove('selected'); // 移除最後的紅框
        }
        randomBox.classList.add('selected'); // 在最終角色上添加紅框
        selectedBox = randomBox; // 更新已選擇的角色

        characterImage.src = randomCharacter.large;
        characterImage.alt = `${randomCharacter.alt} 大圖`;
        characterInfoName.textContent = randomCharacter.alt;

        // selectCharacter(characters[randomIndex]);
    }, 3000); // 3秒後停止
});

function selectCharacter(character) {
    if (selectedBox) {
        selectedBox.classList.remove('selected');
    }

    const selectedBox = document.querySelector(`.character-box[data-id="${character.id}"]`);
    selectedBox.classList.add('selected');
    
    characterImage.src = character.large;
    characterImage.alt = `${character.alt} 大圖`;
    characterInfoName.textContent = character.alt;

    // 新增選中的角色圖片到列表
    const img = document.createElement('img');
    img.src = character.thumb;
    img.alt = character.alt;
    selectedList.appendChild(img);
}