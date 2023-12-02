document.addEventListener('DOMContentLoaded', function () {
    const dossierImages = './img/';
    const nomImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];
    const aside = document.querySelector('aside');
    const posterElement = document.getElementById('poster');
    const dropAreasContainer = document.createElement('div');
    dropAreasContainer.id = 'dropAreasContainer';
    const cle = "dbsHRocrAoheHfq6Eu4IYl1eVs1XMx3lyYwqN4aXLT4"
    const nombreImages = 6;
    let selectedDropArea = null;
    

    //Fonction pour récupérer 6 images au hasard depuis Unsplashed
    async function getUnsplashImages() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${cle}&count=${nombreImages}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des images depuis Unsplash:', error);
            return null;
        }
    }

    // Fonction pour gérer le dragstart sur les images de la partie gauche
    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.src);
    }

    // Ajout d'événements de clic pour les images dans la partie gauche
    async function afficherImages() {
        const imagesInternet = await getUnsplashImages();
        // Si tout marche bien, afficher les images récupérées sur Unsplashed
        if (imagesInternet) {
            imagesInternet.forEach((image) => {
                const imgElement1 = document.createElement('img');
                imgElement1.src = image.urls.regular;
                imgElement1.alt = image.alt_description;
                imgElement1.style.width = '100px'; // Définir la largeur en pixels
                imgElement1.style.height = '100px'; // Définir la hauteur en pixels

                // Ajouter l'événement de dragstart
                imgElement1.addEventListener('dragstart', handleDragStart);

                // Ajouter l'événement de clic
                imgElement1.addEventListener('click', function () {
                    imgElement1.addEventListener('click', function () {
                        if (selectedDropArea) {
                            selectedDropArea.innerHTML = `<img src="${imgElement1.src}" style="width: 100%; height: 100%;">`;
                            selectedDropArea.classList.remove('selected');
                            selectedDropArea = null;
                        }
                    });
                });


                aside.appendChild(imgElement1);
            });
        } else {
            // En cas d'erreur, afficher les images de secours depuis le dossier img
            nomImages.forEach(function(imageName) {
                const imgElement2 = document.createElement('img');
                imgElement2.src = dossierImages + imageName;
                imgElement2.style.width = '100px';
                imgElement2.style.height = '100px';
                
                // Ajouter l'événement de dragstart
                imgElement2.addEventListener('dragstart', handleDragStart);

                // Ajouter l'événement de clic
                imgElement2.addEventListener('click', function () {
                    if (selectedDropArea) {
                        selectedDropArea.innerHTML = `<img src="${imgElement2.src}" style="width: 100%; height: 100%;">`;
                        selectedDropArea.classList.remove('selected');
                        selectedDropArea = null;
                    }
                });

                
                aside.appendChild(imgElement2);
            });
        }
    }



    // Ajout de 4 zones de dépôt
    for (let i = 1; i <= 4; i++) {
        const dropArea = document.createElement('div');
        dropArea.className = 'depot';
        dropArea.dataset.zone = i; // Utilisation d'un attribut de données pour identifier chaque zone

        // Ajouter les gestionnaires d'événements de dragover, dragleave et drop
        dropArea.addEventListener('dragover', function (event) {
            event.preventDefault();
            // Ajouter une classe de survol pour indiquer que l'élément peut être déposé
            this.classList.add('drag-over');
        });

        dropArea.addEventListener('dragleave', function () {
            // Retirer la classe de survol lorsque l'élément quitte la zone de dépôt
            this.classList.remove('drag-over');
        });
        
        dropArea.addEventListener('drop', function (event) {
            event.preventDefault();
            // Retirer la classe de survol
            this.classList.remove('drag-over');

            // Récupérer l'URL de l'image depuis les données de l'événement de drop
            const imageUrl = event.dataTransfer.getData('text/plain');

            // Mettre à jour la zone de dépôt avec l'image
            this.innerHTML = `<img src="${imageUrl}" style="width: 100%; height: 100%;">`;

            // Retirer la classe 'selected' de toutes les zones de dépôt
            document.querySelectorAll('.depot').forEach(function (area) {
                area.classList.remove('selected');
            });

            // Réinitialiser la zone sélectionnée
            selectedDropArea = null;
        });

        // Ajouter l'événement de clic
        dropArea.addEventListener('click', function () {
            // Mettre à jour la zone de dépôt sélectionnée
            selectedDropArea = dropArea;

            // Retirer la classe 'selected' de toutes les zones de dépôt
            document.querySelectorAll('.depot').forEach(function (area) {
                area.classList.remove('selected');
            });

            // Ajouter la classe 'selected' à la zone de dépôt cliquée
            dropArea.classList.add('selected');


            // Vérifier si une image est sélectionnée dans la partie gauche
            const selectedImage = document.querySelector('aside img.selected');
            if (selectedImage) {
                // Si une image est sélectionnée, mettre à jour la zone de dépôt sélectionnée avec l'image
                dropArea.innerHTML = `<img src="${selectedImage.src}" style="width: 100%; height: 100%;">`;
                selectedImage.classList.remove('selected');
            }
        });

        dropAreasContainer.appendChild(dropArea);
    }

    posterElement.appendChild(dropAreasContainer);

    // Ajout d'un gestionnaire d'événements de clic sur l'ensemble de la page, pour désélectionner les éléments si on clique autre part
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

    const colorPicker = document.getElementById('background-color-picker');

    colorPicker.addEventListener('input', function () {
        const selectedColor = colorPicker.value;
        posterElement.style.backgroundColor = selectedColor;
    });

    // Ajout d'événements de clic pour les images dans la partie gauche
    async function afficherImages() {
        const imagesInternet = await getUnsplashImages();
        if (imagesInternet) {
            imagesInternet.forEach((image) => {
                const imgElement1 = document.createElement('img');
                imgElement1.src = image.urls.regular;
                imgElement1.alt = image.alt_description;
                imgElement1.style.width = '100px'; // Définir la largeur en pixels
                imgElement1.style.height = '100px'; // Définir la hauteur en pixels

                imgElement1.addEventListener('click', function () {
                    if (selectedDropArea) {
                        selectedDropArea.innerHTML = `<img src="${imgElement1.src}" style="width: 100%; height: 100%;">`;
                        selectedDropArea.classList.remove('selected');
                        selectedDropArea = null;
                    }
                });

                aside.appendChild(imgElement1);
            });
        } else {
            // En cas d'erreur, afficher les images de secours depuis le dossier img
            nomImages.forEach(function(imageName) {
                const imgElement2 = document.createElement('img');
                imgElement2.src = dossierImages + imageName;
                imgElement2.style.width = '100px';
                imgElement2.style.height = '100px';
                
                imgElement2.addEventListener('click',function (event){
                    if(selectedDropArea){
                        selectedDropArea.innerHTML = `<img src="${imgElement2.src}" style="width: 100%; height: 100%;">`;

                        selectedDropArea.classList.remove('selected');
                        selectedDropArea = null;

                    }    
                });
                aside.appendChild(imgElement2);
            });
        }
    }

    afficherImages();
});



