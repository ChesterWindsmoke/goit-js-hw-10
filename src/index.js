import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

loaderEl.style.display = 'block';
catInfo.style.display = 'none';
errorEl.style.display = 'none';

// Викликаємо ф-цію з даними про породи котів та виводимо їх у select
fetchBreeds().then(breedsData => {
    breedsData.forEach(breed => {
        const optionEl = document.createElement('option');
        optionEl.textContent = breed.name;
        optionEl.value = breed.id;
        breedSelect.appendChild(optionEl);
    });
    catInfo.style.display = 'block';
}).catch(error => {
    breedSelect.style.display = 'none';
    errorEl.style.display = 'block'; // Відображаємо блок з помилкою
}).finally(() => {
    loaderEl.style.display = 'none';
    if (!errorEl.style.display) {
        breedSelect.style.display = 'block'; // Зробити селектор видимим після завершення запиту, якщо немає помилки
    }
});

// Ф-ція для виведення даних у div 'cat-info'
function displayCatInfo(data) {
    const catData = data[0]; // Отримуємо перший об'єкт з масиву даних
    catInfo.innerHTML = `
    <h2>${catData.breeds[0].name}</h2>
    <img src="${catData.url}" alt="${catData.breeds[0].name}"/>
    <p>Breed: ${catData.breeds[0].name}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;
}

// Викликаємо ф-цію для вибраної породи кота при зміні значення select
breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Очищаємо блок 'cat-info' перед новим запитом
    catInfo.innerHTML = '';

    loaderEl.style.display = 'block'; // Показати лоадер перед початком запиту
    fetchCatByBreed(selectedBreedId).then(data => {
        displayCatInfo(data);
    }).finally(() => {
        loaderEl.style.display = 'none'; // Приховати лоадер після завершення запиту
    });
});









