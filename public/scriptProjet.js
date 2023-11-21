document.addEventListener('DOMContentLoaded', function () {
    // Emplacement des images dans le dossier "img"
    const dossierImages = './img/';

    // Liste des noms de fichiers des images à afficher
    const nomImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];

    // Sélection de la balise aside
    const aside = document.querySelector('aside');

    // Compteur pour suivre le nombre d'images déposées
    let droppedImagesCount = 0;

    // Affichage des 6 photos dans la partie gauche
    nomImages.forEach(function (imageName) {
        const imgElement = document.createElement('img');
        imgElement.src = dossierImages + imageName;
        aside.appendChild(imgElement);
    });

    // Sélection de la zone de dépôt des images sources
    const posterElement = document.getElementById('poster');

    // Ajout d'un gestionnaire d'événements pour permettre aux utilisateurs de déposer des images
    posterElement.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    // Fonction pour gérer le dépôt d'une image dans une zone
    function gererDrop(event) {
        event.preventDefault();

        // Autoriser le dépôt uniquement si le nombre d'images déposées est inférieur à 4
        if (droppedImagesCount < 4) {
            const files = event.dataTransfer.files;

            for (const file of files) {
                if (file.type.match('image.*')) {
                    const reader = new FileReader();

                    reader.onload = function (readerEvent) {
                        const imgElement = document.createElement('img');
                        imgElement.src = readerEvent.target.result;
                        posterElement.appendChild(imgElement);

                        // Incrémenter le compteur d'images déposées
                        droppedImagesCount++;

                        // Désactiver le dépôt après 4 images
                        if (droppedImagesCount === 4) {
                            posterElement.removeEventListener('drop', gererDrop);
                        }
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    }
});
// Ajout d'événements de dépôt pour chaque zone
const dropAreas = document.querySelectorAll('.depot');
dropAreas.forEach(function (dropArea) {
    dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    dropArea.addEventListener('drop', handleDrop);

    // Ajout d'un gestionnaire d'événements pour mettre en surbrillance la zone sélectionnée
    dropArea.addEventListener('click', function () {
        dropAreas.forEach(function (area) {
            area.classList.remove('selected');
        });
        dropArea.classList.add('selected');
    });
});