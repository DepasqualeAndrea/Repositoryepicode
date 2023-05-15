let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');


window.onload = () => {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((res) => {
        console.log(res);
      if (res.ok) {
        return res.json();
        
      } else {
        throw new Error("Page not found");
      }
    })
    .then((data)=> {
        const eCards = document.querySelector('.rowCard')
            for (let i = 0; i < data.length; i++) {
                let cardList = data[i]
                eCards.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-3 my-4 idRemove idAdd">
                <div class="card">
                <img src="${cardList.img}" class="card-img-top image-fluid"  alt="...">
                <div class="card-body">
                  <h5 class="card-title">${cardList.title}</h5>
                  <p class="card-text">id: ${cardList.asin}</p>
                  <div class="row container gap-2">
                  <button  href="#" onclick="addToCard(event)" class="btn btn-primary p-1 w-75 add-Too"> <i class="bi bi-bag-plus mr-2"></i> Add to Card</button>
                  <button  href="#" onclick='removeToShip(event)' class="btn btn-danger p- w-75"><i class="bi bi-trash"></i> Remove</button>
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
//rimuovi books dalla pagina
const removeToShip = (rem) => {
    rem.target.closest(".idRemove").remove()
}
//apro carrello
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//chiudo carrello
closeCart.onclick = () => {
  cart.classList.remove("active");
};
//manipolazione card 
if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
}else{
  ready();
}
//function ready to
function ready(){
  var removeCardButton = document.getElementsByClassName('cart-remove')
  console.log(removeCardButton)
  for (var i = 0; i< removeCardButton.length; i++){
    var button = removeCardButton[i]
    button.addEventListener('click', removeCardsItems)
  }
  //aggiunta books dal dom
  var addToCard = document.querySelector('.box-cart')
  for (var i = 0; i< addToCard.length; i++){
    var button = addToCard[i];
    button.addEventListener('click', addToCardclick)
  }
}

//rimuovo items dal carrello

function removeCardsItems(event){
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove()
}
 // func add

const addToCard = (event) => {
  var immagine = event.target.closest('.card').querySelector('img').src;
  var title = event.target.closest('.card').querySelector('h5').innerText;
  var id = event.target.closest('.card').querySelector('.card-text').innerText;

  // aggiuntA 
  
  let newTeee = document.querySelector('.cart-contenuto')
  newTeee.innerHTML += `<div class="box-cart">
  <img src="${immagine}" alt="" class="cart-img">
  <div class="details">
    <div class="product-title">${title}</div>
    <div class="products-id">${id}</div>
  </div>
  <i class="bi bi-trash-fill cart-remove" onclick='removeCardsItems(event)'></i>
</div>`
  console.log(immagine, title, id)
}





