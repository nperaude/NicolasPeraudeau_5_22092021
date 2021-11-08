let produitLocalStorage = JSON.parse(
  localStorage.getItem("produit")
); /*recuperation du tableau "produit" dans le localStorage si il existe*/
const sectionPanier = document.querySelector("#panier");
const sectionFormulaire = document.querySelector("#formulaire");
let total = 0; /*innitialisation de la variable pour le prix total*/

if (produitLocalStorage === null) {
  /*si le panier est vide affichage du message "vide"*/
  sectionPanier.innerHTML = '<p id="vide">Vide</p>';
} else {
  /*mise en place du tableau pour le panier*/
  let htmlPanier =
    "<table><tr><th>Produit</th><th>Nom</th><th>Couleur</th><th>Quantité</th><th>Prix</th></tr>";
  for (let produit of produitLocalStorage) {
    htmlPanier += `<tr><td><img src="${produit.image}"/></td><td>${produit.nom}</td><td>${produit.couleur}</td><td>${produit.quantité}</td><td>${produit.prix}€</td></tr>`;
    total += produit.prix; /*calcul prix total*/
  }
  htmlPanier += `</table>
  <div id="vide-bouton"><p>Vider le panier</p></div>`;
  sectionPanier.innerHTML = htmlPanier;
  /*fin tableau */
  /*affichage formulaire + total + bouton passer la commande*/
  let htmlForm = `<form>
  <div class="formulaire">
      <label for="first-name">Prenom</label>
      <input type="text" id="first-name" name="user_first_name">
  </div>
  <div class="formulaire">
      <label for="last-name">Nom</label>
      <input type="text" id="last-name" name="user_last_name">
  </div>
  <div class="formulaire">
      <label for="adress">Adresse</label>
      <input type="text" id="adress" name="user_adress">
  </div>
  <div class="formulaire">
      <label for="city">Ville</label>
      <input type="text" id="city" name="user_city">
  </div>
  <div class="formulaire">
      <label for="mail">e-mail</label>
      <input type="email" id="email" name="user_mail">
  </div> 
  </form>
  <p id="total">Total: ${total}€</p>
  <div class="bouton" id="commande"><p>Passer la commande</p></div>
  <p id="erreur"></p>
  `;
  sectionFormulaire.innerHTML = htmlForm;
  /*fin affichage*/
}
/*fonction pour vider le panier*/
let boutonVide = document.querySelector("#vide-bouton");

boutonVide.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});
/*fin fonction*/

/*variable pour le formulaire*/
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let adress = document.querySelector("#adress");
let city = document.querySelector("#city");
let email = document.querySelector("#email");
let vert = "#def8d7";
let rouge = "#f8d7d7";
/*fin variable*/

/*regex pour validation de l'email*/
function emailValid(email) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  );
}

/*regex pour validation du nom,prenom*/
function textValid(value) {
  return /^[A-Za-zèéàêë]{2,20}$/.test(value);
}

/*regex pour validation de l'adresse*/
function adressValid(value) {
  return /^([0-9]*) ([a-zA-Z-èéàêë ]*)$/.test(value);
}

/*regex pour validation de la ville*/
function cityValid(value) {
  return /^([a-zA-Z-èéàêë ]*)$/.test(value);
}

/*fonctions pour verrifier les info du formulaire*/
firstName.addEventListener("input", function (e) {
  let value = e.target.value;
  if (textValid(value)) {
    e.target.style.backgroundColor = vert;
  } else {
    e.target.style.backgroundColor = rouge;
  }
});

lastName.addEventListener("input", function (e) {
  let value = e.target.value;
  if (textValid(value)) {
    e.target.style.backgroundColor = vert;
  } else {
    e.target.style.backgroundColor = rouge;
  }
});

adress.addEventListener("input", function (e) {
  let value = e.target.value;
  if (adressValid(value)) {
    e.target.style.backgroundColor = vert;
  } else {
    e.target.style.backgroundColor = rouge;
  }
});

city.addEventListener("input", function (e) {
  let value = e.target.value;
  if (cityValid(value)) {
    e.target.style.backgroundColor = vert;
  } else {
    e.target.style.backgroundColor = rouge;
  }
});

email.addEventListener("input", function (e) {
  let value = e.target.value;
  if (emailValid(value)) {
    e.target.style.backgroundColor = vert;
  } else {
    e.target.style.backgroundColor = rouge;
  }
});
/*fin des fonction de verification*/

let commande = document.querySelector("#commande");
commande.addEventListener("click", function () {
  if (
    /*si toute les info du formulaire sont bonne*/
    textValid(firstName.value) &&
    textValid(lastName.value) &&
    adressValid(adress.value) &&
    cityValid(city.value) &&
    emailValid(email.value)
  ) {
    let orderProducts = []; /*creation d'un tableau de produit*/

    for (let produit of produitLocalStorage) {
      orderProducts.push(produit.id);
    }
    /*fin creation tableau*/

    /* objet qui contien l'objet de contact + le tableau de produit*/
    let order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: adress.value,
        city: city.value,
        email: email.value,
      },

      products: orderProducts,
    };
    /*-------------*/
    /*requete POST a l'api pour envoyer l'objet de contact et le tableau de produit commander*/
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    })
      .then((reponse) => reponse.json())
      .then((productOrder) => {
        localStorage.setItem(
          "recap",
          JSON.stringify(productOrder)
        ); /*recuperation + stockage des info retourner par l'api*/
        window.location.href = "recap.html";
      })

      .catch((error) => console.log(error));
  } else {
    /*affichage d'un message d'erreur si le formulaire n'est pas correctement rempli*/
    document.querySelector("#erreur").textContent =
      "Completer correctement le formulaire";
  }
});
