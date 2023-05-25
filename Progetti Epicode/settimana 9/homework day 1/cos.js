"use strict";
const btn = document.querySelector('#btn');
const ply1 = document.querySelector('#ply1');
const ply2 = document.querySelector('.ply2');
const bet = document.querySelector('.res');
const resultPly1 = document.querySelector('.answer-player-1');
const resultPly2 = document.querySelector('.answer-player-2');
const compiler = document.querySelector('#form');
function randomize() {
    const primo = Number(ply1.value);
    const secondo = Number(ply2.value);
    let randomNumber = Math.floor(Math.random() * (10 - 1) + 1);
    bet.innerHTML = `<p>Result</p>
  <p class="result-extraction">${randomNumber}</p>`;
    console.log(primo, secondo);
}
/*compiler.addEventListener('submit', (event) => {
  event.preventDefault();
  randomize();
  const primo:number = Number(ply1.value);
  const secondo:number = Number(ply2.value);
  console.log(primo,secondo);

})*/
