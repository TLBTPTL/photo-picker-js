document.addEventListener('DOMContentLoaded', function () {
    const dossierImages = './img/';
    const nomImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];
    const aside = document.querySelector('aside');
    const posterElement = document.getElementById('poster');
    const dropAreasContainer = document.createElement('div');
    dropAreasContainer.id = 'dropAreasContainer';

    let selectedDropArea = null; // Variable pour stocker la zone de dépôt sélectionnée

    // Ajout de 4 zones de dépôt
    for (let i = 1; i <= 4; i++) {
        const dropArea = document.createElement('div');
        dropArea.className = 'depot';
        dropArea.dataset.zone = i; // Utilisation d'un attribut de données pour identifier chaque zone

        dropArea.addEventListener('click', function () {
            // Mettre à jour la zone de dépôt sélectionnée
            selectedDropArea = dropArea;

            // Retirer la classe 'selected' de toutes les zones de dépôt
            document.querySelectorAll('.depot').forEach(function (area) {
                area.classList.remove('selected');
            });

            // Ajouter la classe 'selected' à la zone de dépôt cliquée
            dropArea.classList.add('selected');
        });

        dropAreasContainer.appendChild(dropArea);
    }

    posterElement.appendChild(dropAreasContainer);

    // Ajout d'événements de clic pour les images dans la partie gauche
    nomImages.forEach(function (imageName) {
        const imgElement = document.createElement('img');
        imgElement.src = dossierImages + imageName;
        imgElement.style.width = '100px'; // Définir la largeur en pixels
        imgElement.style.height = '100px'; // Définir la hauteur en pixels

        imgElement.addEventListener('click', function (event) {
            // Vérifier si une zone de dépôt est sélectionnée
            if (selectedDropArea) {
                // Mettre à jour la zone de dépôt avec l'image sélectionnée
                selectedDropArea.innerHTML = `<img src="${imgElement.src}" style="width: 100%; height: 100%;">`;

                // Réinitialiser la zone de dépôt sélectionnée
                selectedDropArea.classList.remove('selected');
                selectedDropArea = null;
            }
        });

        aside.appendChild(imgElement);
    });
});
