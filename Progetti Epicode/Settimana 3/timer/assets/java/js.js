const timeS = document.querySelector('h1');
let timeSeconds = 30;

timeS.innerHTML = `${timeSeconds}`;

const countDown = setInterval (() => {
    timeSeconds--;
    timeS.innerHTML = `${timeSeconds}`;
    if(timeSeconds <= 0 || timeSeconds < 1){
        clearInterval(countDown)
    }

},1000);