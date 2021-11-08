let url = "http://localhost:3000/api/teddies";

fetch(url)
  .then((reponse) =>
    reponse.json().then((data) => {
      let affichage = '<section id="produits">';
      for (let ours of data) {
        affichage += `<a href="produit.html?id=${ours._id}">`;
        affichage += "<article>";
        affichage += `<img src="${ours.imageUrl}" alt="photo ours en peluche" class="image_article"/>`;
        affichage += `<p class="nom">${ours.name}</p>`;
        affichage += `<p>${ours.price / 100}€</p>`;
        affichage += "</article>";
        affichage += "</a>";
      }
      affichage += "</section>";
      document.querySelector("#main").innerHTML = affichage;
    })
  )
  .catch(function () {
    let affichage = `<p>Les articles n'ont pas pu ce charger verifier que le serveur local est bien lancé</p>`;
    document.querySelector("#main").innerHTML = affichage;
  });
