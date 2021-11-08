/*recuperation de l'id de l'article */
let params = new URL(document.location).searchParams;
let id = params.get("id");
/*-----------------------*/

let url = "http://localhost:3000/api/teddies/" + id;
fetch(url)
  .then((reponse) =>
    reponse.json().then((data) => {
      /*récuperation + affichage des donnée de l'article */
      let imageSecondaire = document.querySelector("#images_secondaire");
      imageSecondaire.innerHTML = `<img src="${data.imageUrl}" alt="peluche photo 1"/><img src="${data.imageUrl}" alt="peluche photo 2"/><img src="${data.imageUrl}" alt="peluche photo 3"/>`;
      let imagePrincipale = document.querySelector("#image_principale");
      imagePrincipale.setAttribute("src", `${data.imageUrl}`);
      imagePrincipale.setAttribute("alt", "photo principal peluche");
      document.querySelector("h2").textContent = data.name;
      let price = data.price / 100;
      document.querySelector("#price").textContent = `${price}€`;
      let option = '<option value="choix">Choisir une couleur</option>';
      for (let couleur of data.colors) {
        option += `<option value="${couleur}">${couleur}</option>`;
      }
      document.querySelector("#couleur-select").innerHTML = option;
      document.querySelector("#description").textContent = data.description;
      /*-----------fin affichage-------------- */

      /* fonction pour le bouton commander */
      document.querySelector(".bouton").addEventListener("click", function () {
        let color =
          document.getElementById("couleur-select").options[
            document.getElementById("couleur-select").selectedIndex
          ].value;
        if (color === "choix") {
          /*verrification q'une couleur est selectionner */
          document.querySelector("#choix").textContent =
            "choisissez une couleur"; /*affichage message si la couleur n'est pas selectionner */
        } else {
          document.querySelector("#choix").textContent = "";
          let count =
            document.getElementById("quantité-select").options[
              document.getElementById("quantité-select").selectedIndex
            ].value;
          /*innitialisation de l'objet commande qui contient les info de l'article a ajouter au panier*/
          let commande = {
            image: data.imageUrl,
            prix: (data.price / 100) * count,
            nom: data.name,
            id: data._id,
            couleur: color,
            quantité: count,
          };
          /*---------------*/
          let produitLocalStorage = JSON.parse(
            localStorage.getItem("produit")
          ); /*recuperation du tableau "produit" dans le localStorage si il existe*/

          if (produitLocalStorage) {
            /*si le panier contient deja des article on verifie si il ya pas de doublon*/
            let bool = false;
            for (let produit of produitLocalStorage) {
              if (
                /*si produit identique a un deja present dans le panier mise a jours de la quantité*/
                produit.id == commande.id &&
                produit.couleur == commande.couleur
              ) {
                let i = 0;
                while (i < produit.quantité) {
                  count++;
                  i++;
                }

                index = produitLocalStorage.indexOf(produit);
                produitLocalStorage.splice(index, 1);

                commande = {
                  image: data.imageUrl,
                  prix: (data.price / 100) * count,
                  nom: data.name,
                  id: data._id,
                  couleur: color,
                  quantité: count,
                };
                localStorage.setItem(
                  "produit",
                  JSON.stringify(produitLocalStorage)
                );
                produitLocalStorage.push(commande);
                localStorage.setItem(
                  "produit",
                  JSON.stringify(produitLocalStorage)
                );

                bool = true;
                break;
              }
              /*------------*/
            }
            if (!bool) {
              /*si aucun article identique ajout de l'article dans le tableau*/
              produitLocalStorage.push(commande);
              localStorage.setItem(
                "produit",
                JSON.stringify(produitLocalStorage)
              );
            }
          } else {
            /*si le panier est vide ajout de l'article au localStorage*/
            produitLocalStorage = [];
            produitLocalStorage.push(commande);
            localStorage.setItem(
              "produit",
              JSON.stringify(produitLocalStorage)
            );
          }

          document.querySelector(".bouton p").textContent =
            "Article ajouté au panier ✔";
          setTimeout(function () {
            document.querySelector(".bouton p").textContent =
              "Ajouter au panier";
          }, 500);
        }
      });
    })
  )
  .catch(function () {
    /*en cas d'erreur retour a la page d'accueil*/ window.location.href =
      "index.html";
  });
