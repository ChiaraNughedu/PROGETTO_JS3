let url = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url

const productId = paramemters.get("_id")
console.log(productId)

const productDetails = document.getElementById("productDetails");

function loadDetails() {
    fetch(`${url}${productId}`, {
        headers: {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMGI1YWQyMjA3MTAwMTVkZTJmNzkiLCJpYXQiOjE3MzQwODU0NjYsImV4cCI6MTczNTI5NTA2Nn0.oSWXwV2wZVbfO9DZlbq4fyfBYxuCD_NaLkmUcgvo7Aw"
        }
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }else {
            throw new Error("Errore nel recupero del prodotto");
        }
    })
    .then(product => {
        productDetails.innerHTML =  `
        <img src="${product.imageUrl}" class="card-img-top mb-3" alt="${product.name}">
        <h3>${product.name}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Price:</strong> €${product.price.toFixed(2)}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <a href="index.html" class="btn btn-primary">Torna alla lista</a>
      `;
    })
    .catch(err => console.log(err));
}

loadDetails();
  