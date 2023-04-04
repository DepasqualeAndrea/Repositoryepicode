const btn = document.getElementById('verifica');
var eta;//globale perchè viene valorizzata al calcolo dell'età e nella verifica della stampa
var stato;// globale perche viene valorizzata in fase di verifica e usata in stampa

btn.addEventListener('click' , function() {
    let nome = document.getElementById('nome');
    let anno = document.getElementById('anno');

    calcolaeta(anno.value);
    verifica()
    scrivi(nome.value);
    cancellaForm(nome, anno);
});

function calcolaeta(anno) {
    eta = 2023 - anno;
}

function verifica() {
    stato = (eta >= 18) ? 'maggiorenne' : 'minorenne';
}
function scrivi(nome) {
    document.getElementById('mioNome').innerHTML = 'ciao ' + nome;
    document.getElementById('miaVerifica').innerHTML = 'la tua età è ' + eta + ' anni EVVAI! sei ' + stato;
}
function cancellaForm(nome, anno) {
    nome.value = '';
    anno.value = '';
  }