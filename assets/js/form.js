let url = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(window.location.search);
const productId = parameters.get("_id");

if (productId) {
  fetch(`${url}${productId}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMGI1YWQyMjA3MTAwMTVkZTJmNzkiLCJpYXQiOjE3MzQwODU0NjYsImV4cCI6MTczNTI5NTA2Nn0.oSWXwV2wZVbfO9DZlbq4fyfBYxuCD_NaLkmUcgvo7Aw",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante l'invio del prodotto");
      }
    })
    .then((product) => {
      document.getElementById("prodName").value = product.name;
      document.getElementById("brandName").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("insertPrice").value = product.price;
      document.getElementById("descriptionText").value = product.description;
    })
    .catch((error) =>
      console.error("Errore nel caricamento del prodotto:", error)
    );
}

//verrà eseguito ogni volta che l'utente invia il form
document
  .getElementById("insertProduct")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //evita il refresh della pagina

    //raccolta dei dati dal form per "montare l'oggetto productData sotto"
    const name = document.getElementById("prodName").value;
    const brand = document.getElementById("brandName").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const price = parseFloat(document.getElementById("insertPrice").value);
    const description = document.getElementById("descriptionText").value;
    const productData = { name, brand, imageUrl, price, description };

    //let requestMethod = "POST";
    let requestUrl = url;

    if (productId) {
      requestMethod = "PUT";
      requestUrl = `${url}${productId}`;
    }

    fetch(`${url}${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMGI1YWQyMjA3MTAwMTVkZTJmNzkiLCJpYXQiOjE3MzQwODU0NjYsImV4cCI6MTczNTI5NTA2Nn0.oSWXwV2wZVbfO9DZlbq4fyfBYxuCD_NaLkmUcgvo7Aw",
      },
      body: JSON.stringify(productData),
    })
      
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nell'invio del prodotto");
        }
      })
      .then((data) => {
        const action = productId ? "Modificato" : "Aggiunto";
        document.getElementById("result").innerHTML = `<p>Prodotto ${action} con successo! ID: ${data._id}</p>`;
        window.location.href = "homepage.html";
      })
      .catch((err) => console.log(err));
  });

document.getElementById("btnDelete").addEventListener("click", function () {
  if (!productId) {
    showAlert("Nessun prodotto selezionato");
    return;
  }


  fetch(`${url}${productId}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMGI1YWQyMjA3MTAwMTVkZTJmNzkiLCJpYXQiOjE3MzQwODU0NjYsImV4cCI6MTczNTI5NTA2Nn0.oSWXwV2wZVbfO9DZlbq4fyfBYxuCD_NaLkmUcgvo7Aw",
    },
  })
    .then((response) => {
      if (response.ok) {
        showAlert("Prodotto eliminato con successo!", "success");
        setTimeout(() => {
          window.location.href = "homepage.html";
        }, 2000);
      } else {
        throw new Error("Errore durante l'eliminazione del prodotto");
      }
    })
    .catch((err) => {
      console.error("Errore:", err);
      showAlert("Errore durante l'eliminazione del prodotto!", "danger");
    });
});

function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}
