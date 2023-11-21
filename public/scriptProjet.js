const partieGauche = document.querySelector("aside");

function afficherPartieGauche(){
    var image = document.createElement("img");
    image.src = "./img/img1.jpg";
    image.setAttribute("src", "./img/img1.jpg");

    document.body.appendChild(image);
}

afficherPartieGauche();
console.log("image ajoutée");