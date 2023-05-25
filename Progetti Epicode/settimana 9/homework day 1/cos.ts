const btn:any = document.querySelector('#btn');
const ply1 = document.querySelector('#ply1')as HTMLInputElement;
const ply2 = document.querySelector('.ply2')as HTMLInputElement;
const bet:any = document.querySelector('.res');
const resultPly1:any  = document.querySelector('.answer-player-1') as HTMLParagraphElement;
const resultPly2:any = document.querySelector('.answer-player-2') as HTMLParagraphElement;
const compiler = document.querySelector('#form') as HTMLFormElement;


function randomize() {
  const primo:number = Number(ply1.value);
  const secondo:number = Number(ply2.value);
  let randomNumber: number = Math.floor(Math.random()*(10-1)+ 1);
  bet.innerHTML = `<p>Result</p>
  <p class="result-extraction">${randomNumber}</p>`;
  console.log(primo,secondo);
}

/*compiler.addEventListener('submit', (event) => {
  event.preventDefault();
  randomize();
  const primo:number = Number(ply1.value);
  const secondo:number = Number(ply2.value);
  console.log(primo,secondo);

})*/


