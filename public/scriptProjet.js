document.addEventListener('DOMContentLoaded', function () {
    const dossierImages = './img/';
    const nomImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];
    const aside = document.querySelector('aside');
    const posterElement = document.getElementById('poster');
    const dropAreasContainer = document.createElement('div');
    dropAreasContainer.id = 'dropAreasContainer';

    // Ajout de 4 zones de dépôt
    for (let i = 1; i <= 4; i++) {
        const dropArea = document.createElement('div');
        dropArea.className = 'depot';
        dropArea.dataset.zone = i; // Utilisation d'un attribut de données pour identifier chaque zone

        dropArea.addEventListener('click', function () {
            // Retirer la classe 'selected' de toutes les zones de dépôt
            document.querySelectorAll('.depot').forEach(function (area) {
                area.classList.remove('selected');
            });

            // Ajouter la classe 'selected' à la zone de dépôt cliquée
            dropArea.classList.add('selected');

            // Vérifier si une image est sélectionnée dans la partie gauche
            const selectedImage = document.querySelector('aside img.selected');
            if (selectedImage) {
                // Si une image est sélectionnée, mettre à jour la zone avec l'image
                dropArea.innerHTML = `<img src="${selectedImage.src}" style="width: 100%; height: 100%;">`;
            }
        });

        dropAreasContainer.appendChild(dropArea);
    }

    posterElement.appendChild(dropAreasContainer);

    // Ajout d'un gestionnaire d'événements de clic sur l'ensemble de la page
    document.addEventListener('click', function (event) {
        // Vérifier si l'élément cliqué est une zone de dépôt ou une image
        const dropAreaOrImage = event.target.classList.contains('depot') || event.target.tagName === 'IMG';

        if (!dropAreaOrImage) {
            // Retirer la classe 'selected' de toutes les zones de dépôt
            document.querySelectorAll('.depot').forEach(function (area) {
                area.classList.remove('selected');
            });

            // Retirer la classe 'selected' de toutes les images de la partie gauche
            document.querySelectorAll('aside img').forEach(function (img) {
                img.classList.remove('selected');
            });
        }
    });

    // Ajout d'événements de clic pour les images dans la partie gauche
    nomImages.forEach(function (imageName) {
        const imgElement = document.createElement('img');
        imgElement.src = dossierImages + imageName;
        imgElement.style.width = '100px'; // Définir la largeur en pixels
        imgElement.style.height = '100px'; // Définir la hauteur en pixels

        imgElement.addEventListener('click', function (event) {
            // Retirer la classe 'selected' de toutes les zones de dépôt
            document.querySelectorAll('.depot').forEach(function (area) {
                area.classList.remove('selected');
            });

            // Retirer la classe 'selected' de toutes les images de la partie gauche
            document.querySelectorAll('aside img').forEach(function (img) {
                img.classList.remove('selected');
            });

            // Ajouter la classe 'selected' à l'image cliquée
            imgElement.classList.add('selected');

        });

        aside.appendChild(imgElement);
    });
});
