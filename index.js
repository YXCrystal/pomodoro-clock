const sessionUp = document.querySelector('#session-inc');
const sessionDown = document.querySelector('#session-dec');
const sessionTime = document.querySelector('#session-time');
const breakUp = document.querySelector('#break-inc');
const breakDown = document.querySelector('#break-dec');
const breakTime = document.querySelector('#break-time');
const timerTime = document.querySelector('#timer__time');
const timerTitle = document.querySelector('.timer__title');
const playBtn = document.querySelector('#play');
const resetBtn = document.querySelector('#reset');

let counter = 0;
let timeLeft = sessionTime.textContent;

let symbol = '&#9646;&#9646;'
let isPlay = true;
let isSession = true;


timerTime.textContent = convertSeconds(timeLeft * 60 - counter);

function newTime() {
    counter = 0;
    isPlay = true;
    playBtn.innerHTML = '&#9654;'
    timerTitle.textContent = 'Session';  
    
    if (isSession) {
        timeLeft = Number(sessionTime.textContent);
        timerTitle.textContent = 'Session';
    } else {
        timeLeft = Number(breakTime.textContent);
        timerTitle.textContent = 'Break'; 
    }

    timerTime.textContent = convertSeconds(timeLeft * 60 - counter);
}

function convertSeconds(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    return String("0" + min).slice(-2) + ':' + String("0" + sec).slice(-2) 
}

function setup() {
   
    var interval = setInterval(timeIt, 1000);

    function timeIt() {
        if (counter == timeLeft * 60) {
            clearInterval(interval);
            isSession = isSession? false : true;
            newTime();
            setup();
        } else if (isPlay) {
            clearInterval(interval);
        } else {
            counter++;
            timerTime.textContent = convertSeconds(timeLeft * 60 - counter);
        }
    }
}

function timeInc() {
    if (counter === 0) {
        if (isSession && event.target.id === 'session-inc') {
            timeLeft++;
            sessionTime.textContent = Number(sessionTime.textContent) + 1;
        } else if (event.target.id === 'break-inc') {
            if (!isSession) {
                timeLeft++;
                breakTime.textContent = Number(breakTime.textContent) + 1;
            } else {
                breakTime.textContent = Number(breakTime.textContent) + 1;
            }
        }
        timerTime.textContent = convertSeconds(timeLeft * 60 - counter)
    }
}


function timeDec() {
    const sessionVal = Number(sessionTime.textContent);
    const breakVal = Number(breakTime.textContent);

    if (counter === 0) {
        if (isSession && event.target.id === 'session-dec' && sessionVal !== 1) {
            timeLeft--;
            sessionTime.textContent = Number(sessionTime.textContent) - 1;
        } else if (event.target.id === 'break-dec' && breakVal !== 1) {
            if (!isSession) {
                timeLeft--;
                breakTime.textContent = Number(breakTime.textContent) - 1;
            } else {
                breakTime.textContent = Number(breakTime.textContent) - 1;
            }
        }
        console.log(isSession);
        timerTime.textContent = convertSeconds(timeLeft * 60 - counter)
    }
}
    
sessionUp.addEventListener('click', timeInc);

sessionDown.addEventListener('click', timeDec);

breakUp.addEventListener('click', timeInc);

breakDown.addEventListener('click', timeDec);

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
    isSession = true;
    newTime();
});

