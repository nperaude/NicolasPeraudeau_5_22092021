let recapLocalStorage = JSON.parse(localStorage.getItem("recap"));
const articleRecap = document.querySelector("#recap");

if (recapLocalStorage === null) {
  articleRecap.innerHTML = `<p id="vide">Passer d'abord une commande.</p>`;

  document
    .querySelector("#retour-accueil")
    .addEventListener("click", function () {
      window.location.href = "index.html";
    });
} else {
  let total = 0;
  for (let produit of recapLocalStorage.products) {
    total += produit.price / 100;
  }
  let htmlRecap = `<div class="recap"><p>Merci de votre commande</p><p>Prix total est de: ${total}€</p><p>Numéro de commande: ${recapLocalStorage.orderId}</p></div>`;
  articleRecap.innerHTML = htmlRecap;

  document
    .querySelector("#retour-accueil")
    .addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "index.html";
    });
}
