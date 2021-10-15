let recapLocalStorage = JSON.parse(localStorage.getItem("recap"));
const articleRecap = document.querySelector("#recap");
let total = 0;
for (let produit of recapLocalStorage.products) {
  total += produit.price / 100;
}

if (recapLocalStorage === null) {
  articleRecap.innerHTML = '<p id="vide">passer une commande</p>';
} else {
  let htmlRecap = `<p>Merci de votre commande</p><p>Prix total est de: ${total}€</p><p>Numéro de commande: ${recapLocalStorage.orderId}</p>`;
  articleRecap.innerHTML = htmlRecap;
}

document
  .querySelector("#retour-accueil")
  .addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html";
  });
