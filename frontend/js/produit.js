let params = new URL(document.location).searchParams;
let id = params.get("id");

let url = "http://localhost:3000/api/teddies/" + id;
fetch(url).then((reponse) =>
  reponse.json().then((data) => {
    let imageSecondaire = document.querySelector("#images_secondaire");
    imageSecondaire.innerHTML = `<img src="${data.imageUrl}" alt="peluche photo 1"/><img src="${data.imageUrl}" alt="peluche photo 2"/><img src="${data.imageUrl}" alt="peluche photo 3"/>`;
    let imagePrincipale = document.querySelector("#image_principale");
    imagePrincipale.setAttribute("src", `${data.imageUrl}`);
    imagePrincipale.setAttribute("alt", "photo principal peluche");
    document.querySelector("h2").textContent = data.name;
    let price = data.price / 100;
    document.querySelector("#price").textContent = `${price}€`;
    let option = '<option value="">Couleurs</option>';
    for (let couleur of data.colors) {
      option += `<option value="${couleur}">${couleur}</option>`;
    }
    document.querySelector("#couleur-select").innerHTML = option;
    document.querySelector("#description").textContent = data.description;
  })
);
