var stelle = document.querySelectorAll('.stars img');

var rate = () => {
    for (let i = 0; i < stelle.length; i++) {
        do {
            stelle[i].addEventListener('click', function () {
                stelle[i].style.opacity = 1;
            });
            i++;
        } while (i < stelle[i].length);
    }
}

rate();

var hoverstars = () => {
    for (let i = 0; i < stelle.length; i++) {
        switch (stelle[i]) {
            case stelle[0]:
                stelle[0].addEventListener('mouseover', function () {
                    stelle[0].style.opacity = 1;
                });

            case stelle[1]:
                stelle[1].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[2]:
                stelle[2].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[3]:
                stelle[3].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[4]:
                stelle[4].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[5]:
                stelle[5].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[6]:
                stelle[6].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[7]:
                stelle[7].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[8]:
                stelle[8].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });

            case stelle[9]:
                stelle[9].addEventListener('mouseover', function () {
                    stelle[i].style.opacity = 1;
                });
        }
    }
}
