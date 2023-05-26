



let btn = document.querySelector("#btnstop") as HTMLButtonElement;
let startChiamata = document.querySelector("#startChiamata")as HTMLButtonElement;
let numeroChiamato = document.querySelector("#numeroChiamato") as HTMLInputElement;
let dataRecived = document.querySelector("#dataRecived")as HTMLUListElement;
const tempo = document.querySelector('#timer') as HTMLSpanElement;


interface Smartphone {
    charge: number;
    callCount: number;
}
interface Vodafone{
    tariffa: number;
}

class User implements Smartphone, Vodafone{
    charge: number;
    callCount: number;
    tariffa: number = 0.20;
    constructor(_charge: number, _callCount: number, _tariffa: number = 0.20){
        this.charge = _charge;
        this.callCount = _callCount;
        this.tariffa = _tariffa;

    }

    getricarica(reCarger: number):void{
        this.charge += reCarger;
    }
    getCall(minutesCalls: number):void {
        this.charge -= minutesCalls * this.tariffa;
        this.callCount++;
    } 
    numero404(){
        return `il tuo credito residuo è di ${this.charge}`
    };
    getCallsNumber():number{
        return this.callCount; 
    };
    getAzzeraCalls(): void{
        this.callCount = 0;
    }

} 
console.log(`---------------------------------------------`)
console.log('primo utente')
console.log(`---------------------------------------------`)

const centini = new User(0, 0);

centini.getricarica(12);
console.log(centini.numero404());
centini.getCallsNumber();
centini.getCall(15);
console.log("hai effettuato",centini.callCount, "chiamate!");
console.log(centini.numero404());
centini.getricarica(10);
console.log(centini.numero404());

console.log(`---------------------------------------------`)
console.log('secondo utente')
console.log(`---------------------------------------------`)

let dittaFunClub = new User(10,0);

dittaFunClub.getricarica(25);
console.log(dittaFunClub.numero404());
dittaFunClub.getCallsNumber();
dittaFunClub.getCall(36);
console.log("hai effettuato",dittaFunClub.callCount, "chiamate!");
console.log(dittaFunClub.numero404());
dittaFunClub.getricarica(10);
console.log(dittaFunClub.numero404());


console.log(`---------------------------------------------`)
console.log('terzo utente')
console.log(`---------------------------------------------`)


let petrucci = new User(25, 0);

petrucci.getricarica(20);
console.log(petrucci.numero404());
petrucci.getCallsNumber();
petrucci.getCall(54);
console.log("hai effettuato", petrucci.callCount, "chiamate!");
console.log(petrucci.numero404());
petrucci.getricarica(10);
console.log(petrucci.numero404());


let timer: number = 0;
let intervallo: any;

startChiamata.addEventListener('click',() => {
    intervallo = setInterval((): void => {
        tempo.innerHTML = timer + ' seconds';
        timer++;
        console.log(timer);
    }, 1000);
});



btn.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearInterval(intervallo)
    const numChiamato: number = Number(numeroChiamato.value);
    dataRecived.innerHTML = `<ul>
    <li>Hai chiamato il numero:${numChiamato} </li>
    <li>Chiamate effettuate:${centini.callCount}</li>
    <li>Costo chiamata:${centini.tariffa * timer /100}</li>
    <li>Credito residuo prima della chiamata:${centini.charge} </li>
    <li>Credito residuo attuale:${centini.numero404()}</li>
</ul>`

});
