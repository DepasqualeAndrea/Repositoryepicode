const link = 'https://striveschool-api.herokuapp.com/api/product/'
const preload = document.querySelector('#preLoader');
window.addEventListener('load', function () {
  preload.classList.add('.fade-out');
  })

window.onload = () => {
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmNTkzMGQwMTc5MzAwMTQyNjIwNjAiLCJpYXQiOjE2ODM5NzAzNTIsImV4cCI6MTY4NTE3OTk1Mn0.vOEMSLAbkDai1O3TqJ73bKxrcu3BzeFOIJwrMjiMwLM"
      }
  })

    .then((res) => {
        console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data)=> {
      console.log(data, 'eventi')
        const homeCards = document.querySelector('#containerCards')
            for (let i = 0; i < data.length; i++) {
                let cardList = data[i]
                homeCards.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-3 my-4">
                <div class="card h-100">
                <img src="${cardList.imageUrl}" class="card-img-top image-fluid"  alt="...">
                <div class="card-body">
                  <h5 class="card-title text-center">${cardList.name}</h5>
                  <p class="card-text text-center">Brand: <br>${cardList.brand}</p>
                  <p class="card-text text-center text-black-50">Description: <br>${cardList.description}</p>
                  <p class="card-text text-center text-info">$ ${cardList.price}</p>
                  <div class="row container gap-2 align-items-center">
                  <a href="info.html?id=${cardList._id}" class="btn btn-primary p-1 w-100 add-Too"><strong>More info</strong></a>
                  <a href="back-office.html?id=${cardList._id}" class="btn btn-warning rounded-1" p-1 w-100"><i class="bi bi-upload mx-2"></i><strong>Modify</strong></a>
                  </div>
                </div>
              </div>
              </div>`
            }
        })
        .catch((err) => {
          throw new Error('page not found', err);
        })
}
// var spin loader
/*var loader;
function loadNow(opacity) {
  if(opacity <=0){
    displayContent();
  }else{
    loader.style.opacity = opacity;
    window.setTimeout(function(){
      loadNow(opacity - 0,5)
    },1000)
  }
  }
  function displayContent() {
    loader.style.display = 'none;'
    document.getElementById('content').style.display = 'block';
    }
    document.addEventListener("DOMContentLoaded", function () {
      loader = document.querySelector('#loader');
      loadNow(1);
      })*/
