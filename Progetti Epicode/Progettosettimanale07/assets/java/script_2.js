//recupero id per put e delete
const linkFetch = "https://striveschool-api.herokuapp.com/api/product/";
const parameters = new URLSearchParams(location.search);
const productId = parameters.get("id");
console.log(productId);

//utilizzo valori oggetto per post
//richiamo il bottone di riferimento
// btn dopo async per  far si che la async faccia il suo processo e l'addevenlistner
//lanci la function 'POST' per una nuova card

async function newItemino() {
  let nameInput = document.querySelector("#productName").value;
  let descriptionInput = document.querySelector("#prodDescription").value;
  let brandInput = document.querySelector("#brandType").value;
  let imageInput = document.querySelector("#imageProd").value;
  let priceInput = document.querySelector("#prodPrice").value;

  // ora è necessario raccogliere i dati del form e inviarli con una request di tipo POST
  let newItems = {
    name: nameInput,
    description: descriptionInput,
    price: priceInput,
    imageUrl: imageInput,
    brand: brandInput,
  };
  console.log(newItems);

  try {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        body: JSON.stringify(newItems),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmNTkzMGQwMTc5MzAwMTQyNjIwNjAiLCJpYXQiOjE2ODM5NzAzNTIsImV4cCI6MTY4NTE3OTk1Mn0.vOEMSLAbkDai1O3TqJ73bKxrcu3BzeFOIJwrMjiMwLM",

          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("no product sent into database");
    }
    alert("Your product submit have success");
    window.location.href = "/index.html";
  } catch (error) {
    alert("Compila tutti i campi correttamente");
    console.error(error.message);
  }
}
const inputForm = document.querySelector("#creaNewProduct");
inputForm.addEventListener("click", function (hi) {
  hi.preventDefault();
  newItemino();
  console.log("invio dei dati");
});

//async delete

if (productId) {
  document.querySelector("h2").innerText = "Modifica Il prodotto";
  document.querySelector("#creaNewProduct").classList.add("d-none");
  document.querySelector("#remove").classList.remove("d-none");
  document.querySelector("#reset").classList.remove("d-none");
  document.querySelector("#modifica").classList.remove("d-none");
  let deleteButton = document.getElementById("remove");
  deleteButton.addEventListener("click", (del) => {
    del.preventDefault();
      deleteProd();
      popola();  
  });
  async function deleteProd() {
    try {
      const res = await fetch(linkFetch + productId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmNTkzMGQwMTc5MzAwMTQyNjIwNjAiLCJpYXQiOjE2ODM5NzAzNTIsImV4cCI6MTY4NTE3OTk1Mn0.vOEMSLAbkDai1O3TqJ73bKxrcu3BzeFOIJwrMjiMwLM",

          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Impossible to delete");
      }
      confirm("Do you want delete this items?");
      window.location.href = "/index.html";
    } catch (error) {
      alert("IMPOSSIBILE DELETE PRODUCT", error);
      console.error(error.message);
    }
  }
}

//popolo il form
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
    .then((data) => {
      console.log(data);
      document.querySelector("#productName").value = data.name;
      document.querySelector("#prodDescription").value = data.description;
      document.querySelector("#brandType").value = data.brand;
      document.querySelector("#imageProd").value = data.imageUrl;
      document.querySelector("#prodPrice").value = data.price;
    })
    .catch((error) => {
      console.error(error.message);
    });
}
// function per la PUT
if (productId) {
  let update = document.querySelector("#modifica");
  update.addEventListener("click", (mood) => {
    mood.preventDefault();
    upForm();
  });
  async function upForm() {
    let nameInput = document.querySelector("#productName").value;
    let descriptionInput = document.querySelector("#prodDescription").value;
    let brandInput = document.querySelector("#brandType").value;
    let imageInput = document.querySelector("#imageProd").value;
    let priceInput = document.querySelector("#prodPrice").value;

    // ora è necessario raccogliere i dati del form e inviarli con una request di tipo POST
    let newItems = {
      name: nameInput,
      description: descriptionInput,
      price: priceInput,
      imageUrl: imageInput,
      brand: brandInput,
    };

    try {
      const res = await fetch(linkFetch + productId, {
        method: "PUT",
        body: JSON.stringify(newItems),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmNTkzMGQwMTc5MzAwMTQyNjIwNjAiLCJpYXQiOjE2ODM5NzAzNTIsImV4cCI6MTY4NTE3OTk1Mn0.vOEMSLAbkDai1O3TqJ73bKxrcu3BzeFOIJwrMjiMwLM",

          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Cannot modify the product");
      }
      confirm("You want save changes?");
      window.location.href = "/index.html";
    } catch (error) {
      alert("Compila tutti i campi correttamente");
      console.error(error.message);
    }
  }
}
