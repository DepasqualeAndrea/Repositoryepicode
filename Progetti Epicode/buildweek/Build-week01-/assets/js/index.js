var btnVerifica = document.getElementById('bottone1');

btnVerifica.addEventListener('click', function () {
    let valore = check1.value;
    if (valore == true) {
        btnVerifica.setAttribute('href', '../../quiz.html');
    } else {
        alert('devi spuntare la check se vuoiprocedere')
    }
})

btnVerifica();