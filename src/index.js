import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

loaderEl.style.display = 'block';
catInfo.style.display = 'none';

let error = null; // Змінна error оголошена на рівні зовнішнього блоку і буде доступна в обох блоках

fetchBreeds().then(breedsData => {
    breedsData.forEach(breed => {
        const optionEl = document.createElement('option');
        optionEl.textContent = breed.name;
        optionEl.value = breed.id;
        breedSelect.appendChild(optionEl);
    });
    catInfo.style.display = 'block';
}).catch(err => {
    error = err; // Присвоюємо помилку змінній error
    breedSelect.style.display = 'none';
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}).finally(() => {
    loaderEl.style.display = 'none';
    if (!error) {
        breedSelect.style.display = 'block';
    }
});

function displayCatInfo(data) {
    const catData = data[0];
    catInfo.innerHTML = `
    <h2>${catData.breeds[0].name}</h2>
    <img src="${catData.url}" alt="${catData.breeds[0].name}"/>
    <p>Breed: ${catData.breeds[0].name}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;
}

breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    catInfo.innerHTML = '';

    loaderEl.style.display = 'block';
    fetchCatByBreed(selectedBreedId).then(data => {
        displayCatInfo(data);
    }).finally(() => {
        loaderEl.style.display = 'none';
    });
});










