var btnVerifica = document.getElementById('bottone1');
var checkB = document.getElementById('check1');

window.addEventListener('load', function () {
    btnVerifica.disabled = true;
    checkB.checked = false;
});

const verifica = () => {
    checkB.addEventListener('click', function () {
        if (checkB.checked) {
            btnVerifica.disabled = false;
        } else if (checkB.checked == false) {
            btnVerifica.disabled = true
        }
    });
}

verifica();

const paginaDopo = () => {
    btnVerifica.addEventListener('click', function () {
        if (checkB.checked) {
            localStorage.setItem('accesso', 1);
            location.href = ('../../quiz.html');
        }
    });
}

paginaDopo();



