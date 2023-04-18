const timeS = document.querySelector('aside');
let timeSeconds = 30;
var barra = document.querySelector('circle');
timeS.innerHTML =` ${timeSeconds}`;

let countDown = setInterval(() => {
    secondi = document.querySelector('#ss').style.strokeDashoffset = - 420  - (440 * timeSeconds) / 30;
    timeSeconds--;
    timeS.innerHTML = `${timeSeconds} `;
    if (timeSeconds <= 0 || timeSeconds < 1) {
        clearInterval(countDown);
    }

}, 1000);

/* funzione pagina 1 checkbutton.
const input = document.querySelector(".radio");
const button = document.querySelector(".button");

input = addEventListener("click", () => {
    if (input.checked) {
        button.removeAttribute("disabled");
    }else{
        button.setAttribute("disabled", true);
    }
});*/