const linkFetch = "https://striveschool-api.herokuapp.com/api/product/";
const parameters = new URLSearchParams(location.search);
const productId = parameters.get("id");
console.log(productId);
window.onload = () => {

  details()
}

function details (){
    if (productId) {
     
        fetch(linkFetch + productId, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmZjM5NGYzYjY1YzAwMTQ1OTMwMTEiLCJpYXQiOjE2ODQwMDk4ODAsImV4cCI6MTY4NTIxOTQ4MH0.W9DAFpS27HwFF9xqVLfoo3u5AQbPOIsf03ax6vBX260",
          },
        })
          .then((res) => {
            console.log(res);
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Errore nel recupero dei prodotti!");
            }
          })
          .then((data)=> {
            console.log(data)
                let cardList = `<div class="col-12">
                      <div class="card h-100">
                      <img src="${data.imageUrl}" class="card-img-top image-fluid"  alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">Brand: <br>${data.brand}</p>
                        <p class="card-text">Description: <br>${data.description}</p>
                        <p class="card-text">$ ${data.price}</p>
                        <div class="row container gap-2">
                        <a href="/info.html?id=${data._id}" class="btn btn-primary p-1 d-none" > <i class="bi bi-bag-plus mr-2"></i>More info</a>
                        <a href="back-office.html?id=${data._id}" class="btn btn-warning rounded-1 p-1 d-none " ><i class="bi bi-trash"></i>Modifica</a>
                        </div>
                      </div>
                    </div>
                    </div>`
    
                   var info = document.querySelector('#infoCard')
                    info.innerHTML += cardList
                  })
              
              .catch((err) => {
                throw new Error('page not found', err);
              })
      }
}




    
     
         

        

