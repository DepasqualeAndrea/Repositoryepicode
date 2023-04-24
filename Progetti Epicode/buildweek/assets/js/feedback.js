window.addEventListener('load', function () {
    if (localStorage.getItem('tofeedback') != 1) {
        location.href = '../../index.html';
    }
})


var stelle = document.querySelectorAll('.stars img');

var rate = () => {
    stelle.forEach((star, item) => {
        star.addEventListener('click', () => {
            stelle.forEach((star, item1) => {
                item >= item1 ? star.classList.add('stelleColorate') : star.classList.remove('stelleColorate');
            });
        });
    });
}

rate();

var hoverstars = () => {
    stelle.forEach((star, item) => {
        star.addEventListener('mouseover', () => {
            stelle.forEach((star, item1) => {
                item + 1 > item1 ? star.classList.add('stelleColorate') : star.classList.remove('stelleColorate');
            });
        });
    });
}

hoverstars();