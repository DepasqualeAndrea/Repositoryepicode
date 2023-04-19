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
        star.addEventListener('mouseenter', () => {
            stelle.forEach((star, item1) => {
                item > item1 ? star.classList.add('stelleColorate') : star.classList.remove('stelleColorate');
            });
        });
    });
}

 hoverstars();