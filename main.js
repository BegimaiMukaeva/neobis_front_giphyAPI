const MY_API_KEY = 'eOmzpOpTJA4t1E96ITZKGPd1jfuUTo5z';
const limit = 28;

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const giphyContainer = document.getElementById('giphy-container');
const errorText = document.getElementById('error-text');

searchButton.addEventListener('click', function () {
    const input = searchInput.value.trim();
    fetchGiphy(input)
})

function fetchGiphy(input) {
    if (input.trim() === ''){
        displayError('Пустая строка поиска, напишите что-нибудь');
        return Promise.reject('Пустая строка поиска');  // Возвращаем отклоненный промис
    }
    const API_URL = `https://api.giphy.com/v1/stickers/search?api_key=${MY_API_KEY}&q=${input}&limit=${limit}`;

    return fetch(API_URL)
        .then(response =>{
            if (!response.ok){
                return Promise.reject('Ошибка сети или недопустимый статус ответа');
            }
            return response.json();
        })
        .then(data =>{
            const stickers = data.data;
            if (stickers.length === 0){
                displayError('Подходящих GIF не найдено, введите что-нибудь другое')
                displayStickers('')
            } else {
                displayStickers(stickers)
                console.log(stickers)
            }
        })
        .catch(error =>{
            displayError('Подходящих GIF не найдено, введите что-нибудь другое');
            console.log(error);
        })
}

function displayStickers(stickers) {
    giphyContainer.innerText = '';
    errorText.style.display = 'none';

    stickers.forEach(sticker =>{
        const imgElement = document.createElement('img');
        imgElement.classList.add('sticker-img');
        imgElement.style.backgroundColor = '#F5F5DC'
        imgElement.style.width = '350px'
        imgElement.style.height = '300px'
        imgElement.style.margin = '7px'
        imgElement.src = sticker.images.fixed_width.url;
        giphyContainer.appendChild(imgElement);
    })
}

function displayError(errorMessage) {
    giphyContainer.innerHTML = '';
    errorText.textContent = errorMessage;
    errorText.style.display = 'block'
}