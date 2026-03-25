const breedSelect = document.getElementById('breed-select');
const gallery = document.getElementById('gallery');
const totalPhoto = document.getElementById('total-photo');

document.addEventListener('DOMContentLoaded', init);

async function init() {
    await addBreedList();
    breedSelect.addEventListener('change', printDogImage);
    totalPhoto.addEventListener('change', printDogImage);
}

async function addBreedList() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) {
            throw new Error(`Breed list request failed: ${response.status}`);
        }

        const data = await response.json();
        if (data.status !== 'success' || !data.message) {
            throw new Error('Invalid breed list response');
        }

        const breeds = data.message;

        for (const breed in breeds) {
            console.log(breed);

            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);

            breedSelect.appendChild(option);
        }
    } catch (error) {
        console.error('Failed to load breed list:', error);
    }
}

async function printDogImage() {
    const selectedBreed = breedSelect.value;
    const photo = Number(totalPhoto.value);

    if (!selectedBreed || !Number.isInteger(photo) || photo < 1) {
        gallery.innerHTML = '<p>Image not found</p>';
        return;
    }

    try {
        const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${photo}`);
        if (!response.ok) {
            throw new Error(`Dog image request failed: ${response.status}`);
        }

        const data = await response.json();
        if (data.status !== 'success' || !Array.isArray(data.message)) {
            throw new Error('Invalid dog image response');
        }

        gallery.innerHTML = '';
        const dogImages = data.message;
        console.log(dogImages);

        dogImages.forEach(dogImage => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = dogImage;
            img.alt = selectedBreed;

            galleryItem.appendChild(img);
            gallery.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Failed to load dog images:', error);
        gallery.innerHTML = '<p>Image not found</p>';
    }
}

// function addBreedList(){
//     fetch('https://dog.ceo/api/breeds/list/all')
//         .then(response => response.json()) // parse the JSON from the response`
//         .then(data => {
//             const breeds = data.message // all breeds
//
//             for (const breed in breeds){
//                 console.log(breed);
//                 // create the option element
//                 const option = document.createElement('option');
//
//                 // set the option value and textContent
//                 option.value = breed;
//                 option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
//
//                 // append to <select> id='breed-select'
//                 breedSelect.appendChild(option)
//             }
//         });
// }

// function printDogImage(){
//     const selectedBreed = breedSelect.value
//     const photo = totalPhoto.value;
//     if(selectedBreed){
//         fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${photo}`)
//             .then(response => response.json())
//             .then(data => {
//                 gallery.innerHTML = '';
//                 const dogImages = data.message;
//                 console.log(dogImages)
//
//                 dogImages.forEach(dogImage => {
//
//                     const galleryItem = document.createElement('div');
//                     galleryItem.classList.add('gallery-item');
//
//                     const img = document.createElement('img');
//                     img.src = dogImage;
//                     img.alt = selectedBreed;
//
//                     galleryItem.appendChild(img);
//                     gallery.appendChild(galleryItem);
//                 })
//             })
//     }else{
//         gallery.innerHTML = '<p>Image not found</p>';
//     }
// }
