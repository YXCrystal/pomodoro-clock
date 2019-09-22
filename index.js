const sessionUp = document.querySelector('#session-inc');
const sessionDown = document.querySelector('#session-dec');
const sessionTime = document.querySelector('#session-time');
const timerTime = document.querySelector('#timer__time');
const playBtn = document.querySelector('#play');
const resetBtn = document.querySelector('#reset');

let counter = 0;
let timeLeft = Number(sessionTime.textContent);

let symbol = '&#9646;&#9646;'
let isPlay = true;

timerTime.textContent = convertSeconds(timeLeft * 60 - counter);

sessionUp.addEventListener('click', () => {
    
    if (counter === 0) {
        timeLeft++;
        sessionTime.textContent = Number(sessionTime.textContent) + 1;
        timerTime.textContent = convertSeconds(timeLeft * 60 - counter)
    }
})


sessionDown.addEventListener('click', () => {
    const sessionVal = Number(sessionTime.textContent)

    if (sessionVal !== 1 && counter === 0) {
        timeLeft--
        sessionTime.textContent = Number(sessionVal) - 1
        timerTime.textContent = convertSeconds(timeLeft * 60 - counter)
    }
})

function convertSeconds(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    return String("0" + min).slice(-2) + ':' + String("0" + sec).slice(-2) 
}

function setup() {
    var interval = setInterval(timeIt, 1000);
    timeLeft = Number(sessionTime.textContent) * 60;

    function timeIt() {
        if (counter == timeLeft || isPlay) {
            clearInterval(interval);
        } else {
            counter++;
            timerTime.textContent = convertSeconds(timeLeft - counter);
        }
    }  
}

playBtn.addEventListener('click', () => {
    if (isPlay) {
        isPlay = false;
        symbol = '&#9646;&#9646;'
        setup();
    } else {
        isPlay = true;
        symbol = '&#9654;'
    }

    playBtn.innerHTML = symbol

});

resetBtn.addEventListener('click', () => {
    counter = 0;
    isPlay = true;
    playBtn.innerHTML = '&#9654;'
    timeLeft = Number(sessionTime.textContent);
    timerTime.textContent = convertSeconds(timeLeft * 60 - counter);
})