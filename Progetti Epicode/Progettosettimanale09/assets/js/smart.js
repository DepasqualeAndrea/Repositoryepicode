"use strict";
let btn = document.querySelector("#btnstop");
let startChiamata = document.querySelector("#startChiamata");
let numeroChiamato = document.querySelector("#numeroChiamato");
let DataRecived = document.querySelector("#DataRecived");
class User {
    constructor(_charge, _callCount, _tariffa = 0.20) {
        this.tariffa = 0.20;
        this.charge = _charge;
        this.callCount = _callCount;
        this.tariffa = _tariffa;
    }
    getricarica(reCarger) {
        this.charge += reCarger;
    }
    getCall(minutesCalls) {
        this.charge -= minutesCalls * this.tariffa;
        this.callCount++;
    }
    numero404() {
        return `il tuo credito residuo è di ${this.charge}`;
    }
    ;
    getCallsNumber() {
        return this.callCount;
    }
    ;
    getAzzeraCalls() {
        this.callCount = 0;
    }
}
console.log(`---------------------------------------------`);
console.log('primo utente');
console.log(`---------------------------------------------`);
const centini = new User(15, 0);
centini.getricarica(12);
console.log(centini.numero404());
centini.getCallsNumber();
centini.getCall(15);
console.log("hai effettuato", centini.callCount, "chiamate!");
console.log(centini.numero404());
centini.getricarica(10);
console.log(centini.numero404());
console.log(`---------------------------------------------`);
console.log('secondo utente');
console.log(`---------------------------------------------`);
/*let dittaFunClub = new User(10,0);

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


let petrucci = new User(25, 0, petrucci.tariffa);

petrucci.getricarica(20);
console.log(petrucci.numero404());
petrucci.getCallsNumber();
petrucci.getCall(54);
console.log("hai effettuato", petrucci.callCount, "chiamate!");
console.log(petrucci.numero404());
petrucci.getricarica(10);
console.log(petrucci.numero404());*/
let timer = 0;
startChiamata.addEventListener('click', () => {
    setInterval(() => {
        timer++;
        return timer;
    }, 1000);
});
btn.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const numChiamato = Number(numeroChiamato.value);
    DataRecived.innerHTML = `<li>Hai chiamato il numero:${numChiamato} </li>
    <li>Credito residuo prima della chiamata:${centini.charge} </li>
    <li>Costo chiamata:</li>t
    <li>Durata della chiamata:${timer}</li>
    <li>Credito residuo attuale:${centini.numero404()}</li>`;
    timer = 0;
    return timer;
});
