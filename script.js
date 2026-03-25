const breedSelect = document.getElementById('breed-select');
const gallery = document.getElementById('gallery');
const totalPhoto = document.getElementById('total-photo');

addBreedList();

breedSelect.addEventListener('change', printDogImage);
totalPhoto.addEventListener('change', printDogImage);

function addBreedList(){
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json()) // parse the JSON from the response`
        .then(data => {
            const breeds = data.message // all breeds
            
            for (const breed in breeds){
                console.log(breed);
                // create the option element
                const option = document.createElement('option');
                
                // set the option value and textContent
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                
                // append to <select> id='breed-select'
                breedSelect.appendChild(option)
            } 
        });
}

function printDogImage(){
    const selectedBreed = breedSelect.value
    const photo = totalPhoto.value || 1;
    if(selectedBreed){
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${photo}`)
            .then(response => response.json())
            .then(data => {
                gallery.innerHTML = '';
                const dogImages = data.message;
                console.log(dogImages)

                for(let i = 0; i < dogImages.length; i++){   
                    const img = document.createElement('img');
                    img.src = dogImages[i];
                    img.alt = selectedBreed;
                    
                    gallery.appendChild(img);
                }
            })
    }else{
        gallery.innerHTML = '<p>Image not found</p>';
    }
}