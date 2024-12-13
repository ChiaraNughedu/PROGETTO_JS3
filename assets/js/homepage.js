const productList = document.getElementById("productList");
const row = document.getElementById("productRow");


window.addEventListener("DOMContentLoaded", function() {
    fetch( "https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMGI1YWQyMjA3MTAwMTVkZTJmNzkiLCJpYXQiOjE3MzQwODU0NjYsImV4cCI6MTczNTI5NTA2Nn0.oSWXwV2wZVbfO9DZlbq4fyfBYxuCD_NaLkmUcgvo7Aw"
        }
        }) .then(resp => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Errore della fetch");
            }
          }) .then(products => {
            products.forEach(product => { //colonne
              const column = document.createElement("div");
              column.className = "column-md-4";
              row.appendChild(column);
              const card = document.createElement("div");
              card.classList.add("card");
              card.classList.add("mb-4");
              column.appendChild(card);
    //sezione immagini card
              const img = document.createElement("img");
              img.className = "bd-placeholder-img card-img-top object-fit-cover";
              img.setAttribute("src", product.imageUrl);
              img.style.height = "25vh";
              img.setAttribute("alt", product.alt);
    
              card.appendChild(img);
              const cardBody = document.createElement("div");
              cardBody.className = "card-body";
              card.appendChild(cardBody);
              const cardTitle = document.createElement("h4");
              cardTitle.className = "card-title";
              cardTitle.innerText = product.name;
              cardBody.appendChild(cardTitle);
              const brandName = document.createElement("p");
              brandName.className = "lead card-text";
              brandName.innerText = `Brand: ${product.brand}`;
              cardBody.appendChild(brandName);
              const description = document.createElement("p");
              description.className = "card-text";
              description.innerText = `Descrizione: ${product.brand}`;
              const priceBadge = document.createElement("p");
              priceBadge.className = "card-text text-dark";
              priceBadge.innerText = `Prezzo: ${product.price}`;
              cardBody.appendChild(priceBadge);
              
      //buttons delle card
              const btnContainer = document.createElement("div");
              btnContainer.className = "btn-group";
              cardBody.appendChild(btnContainer);
      
              const btnModifica = document.createElement("div");
              btnModifica.className = "btn-group";
              btnContainer.appendChild(btnModifica);
              const btnView = document.createElement("button");
              btnView.type = "button";
              btnView.className = "btn btn-sm btn-secondary";
              btnView.innerText = `Modifica`;
              btnModifica.appendChild(btnView);
              btnView.addEventListener("click", function () {
                window.location.assign("details.html?id=" + product._id);
              });
              const btnScopri = document.createElement("button");
              btnScopri.type = "button";
              btnScopri.className = "btn btn-sm btn-primary";
              btnScopri.innerText = `Scopri di più`;
              btnModifica.appendChild(btnScopri);
              btnScopri.addEventListener("click", function () {
                window.location.assign("form.html?id=" + product._id);
              });
      
              console.log(product._id);
            });
          });
      });
