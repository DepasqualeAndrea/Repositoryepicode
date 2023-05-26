



let btn = document.querySelector("#btnstop") as HTMLButtonElement;
let startChiamata = document.querySelector("#startChiamata") as HTMLButtonElement;
let numeroChiamato = document.querySelector("#numeroChiamato") as HTMLInputElement;
let DataRecived = document.querySelector("#DataRecived") as HTMLTextAreaElement;


interface Smartphone {
    charge: number;
    callCount: number;
}


class User implements Smartphone{
    charge: number;
    callCount: number;
    constructor(_charge: number, _callCount: number){
        this.charge = _charge;
        this.callCount = _callCount;

    }

    getricarica(reCarger: number):void{
        this.charge += reCarger;
    }
    getCall(minutesCalls: number):void {
        this.charge -= minutesCalls * 0.20;
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

const centini = new User(15, 0);

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

startChiamata.addEventListener('click',() => {
    setInterval((): number => {
        timer++;
        return timer;
    }, 1000);
});

btn.addEventListener('submit',(ev) => {
    ev.preventDefault();
    const numChiamato: number = Number(numeroChiamato.value);
    DataRecived.innerHTML = `<li>Hai chiamato il numero:${numChiamato} </li>
    <li>Credito residuo prima della chiamata:${centini.charge} </li>
    <li>Costo chiamata:</li>t
    <li>Durata della chiamata:${timer}</li>
    <li>Credito residuo attuale:${centini.numero404()}</li>`
    timer = 0;
    return timer;
});