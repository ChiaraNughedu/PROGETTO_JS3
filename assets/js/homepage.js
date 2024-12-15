const accessKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMGI1YWQyMjA3MTAwMTVkZTJmNzkiLCJpYXQiOjE3MzQwODU0NjYsImV4cCI6MTczNTI5NTA2Nn0.oSWXwV2wZVbfO9DZlbq4fyfBYxuCD_NaLkmUcgvo7Aw";

const endPoint = "https://striveschool-api.herokuapp.com/api/product/";

const cardBox = document.getElementById("cardBox");
const contentRow = document.getElementById("contentRow");

cardBox.appendChild(contentRow);

function createNewCard(product) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-3 mb-4";
  contentRow.appendChild(col);
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
     <div class="card h-100 d-flex flex-column">
             <img src="${product.imageendPoint}" class="card-img-top" alt="${product.name}" style="max-height: 200px; object-fit: cover;">
             <div class="card-body d-flex flex-column">
               <h5 class="card-title">${product.name}</h5>
               <p id="brand">${product.brand}</p>
               <p id="price">${product.price}</p>
               <a href="details.html?id=${product._id}" class="btn btn-primary m-2">Show info</a>
               <a href="backOffice.html?id=${product._id}" class="btn btn-primary m-2">Modifica</a>
             </div>
           </div>
           `;

  col.appendChild(card);
}

fetch(endPoint, {
  headers: {
    Authorization: `Bearer ${accessKey}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore durante l'invio del prodotto");
    }
  })
  .then((products) => {
    products.forEach((product) => {
      createNewCard(product);
    });
  })
  .catch((err) => console.log(err));
