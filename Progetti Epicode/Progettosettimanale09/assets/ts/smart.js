var btn = document.querySelector("#btnstop");
var startChiamata = document.querySelector("#startChiamata");
var numeroChiamato = document.querySelector("#numeroChiamato");
var dataRecived = document.querySelector("#dataRecived");
var tempo = document.querySelector('#timer');
var User = /** @class */ (function () {
    function User(_charge, _callCount, _tariffa) {
        if (_tariffa === void 0) { _tariffa = 0.20; }
        this.tariffa = 0.20;
        this.charge = _charge;
        this.callCount = _callCount;
        this.tariffa = _tariffa;
    }
    User.prototype.getricarica = function (reCarger) {
        this.charge += reCarger;
    };
    User.prototype.getCall = function (minutesCalls) {
        this.charge -= minutesCalls * this.tariffa;
        this.callCount++;
    };
    User.prototype.numero404 = function () {
        return "il tuo credito residuo \u00E8 di ".concat(this.charge);
    };
    ;
    User.prototype.getCallsNumber = function () {
        return this.callCount;
    };
    ;
    User.prototype.getAzzeraCalls = function () {
        this.callCount = 0;
    };
    return User;
}());
console.log("---------------------------------------------");
console.log('primo utente');
console.log("---------------------------------------------");
var centini = new User(0, 0);
centini.getricarica(12);
console.log(centini.numero404());
centini.getCallsNumber();
centini.getCall(15);
console.log("hai effettuato", centini.callCount, "chiamate!");
console.log(centini.numero404());
centini.getricarica(10);
console.log(centini.numero404());
console.log("---------------------------------------------");
console.log('secondo utente');
console.log("---------------------------------------------");
var dittaFunClub = new User(10, 0);
dittaFunClub.getricarica(25);
console.log(dittaFunClub.numero404());
dittaFunClub.getCallsNumber();
dittaFunClub.getCall(36);
console.log("hai effettuato", dittaFunClub.callCount, "chiamate!");
console.log(dittaFunClub.numero404());
dittaFunClub.getricarica(10);
console.log(dittaFunClub.numero404());
console.log("---------------------------------------------");
console.log('terzo utente');
console.log("---------------------------------------------");
var petrucci = new User(25, 0);
petrucci.getricarica(20);
console.log(petrucci.numero404());
petrucci.getCallsNumber();
petrucci.getCall(54);
console.log("hai effettuato", petrucci.callCount, "chiamate!");
console.log(petrucci.numero404());
petrucci.getricarica(10);
console.log(petrucci.numero404());
var timer = 0;
var intervallo;
startChiamata.addEventListener('click', function () {
    intervallo = setInterval(function () {
        tempo.innerHTML = timer + ' seconds';
        timer++;
        console.log(timer);
    }, 1000);
});
btn.addEventListener('click', function (ev) {
    ev.preventDefault();
    clearInterval(intervallo);
    var numChiamato = Number(numeroChiamato.value);
    dataRecived.innerHTML = "<ul>\n    <li>Hai chiamato il numero:".concat(numChiamato, " </li>\n    <li>Chiamate effettuate:").concat(centini.callCount, "</li>\n    <li>Costo chiamata:").concat(centini.tariffa * timer / 100, "</li>\n    <li>Credito residuo prima della chiamata:").concat(centini.charge, " </li>\n    <li>Credito residuo attuale:").concat(centini.numero404(), "</li>\n</ul>");
});
