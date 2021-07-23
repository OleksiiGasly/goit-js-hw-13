import axios from "axios";

export default class Search {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.shownCards = 0;
        this.totalCards = 0;
    }

    // Фиксация ключа поиска
    newSearchQuery(searchQuery) {
        this.searchQuery = searchQuery;
    }

    // Отправка поискового запроса
    async fetchItems(apiKey, quantity) {
        const BASE_URL = 'https://pixabay.com/api/';
        const params = {
            key: apiKey,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: quantity,           
        }
        const response = await axios.get(BASE_URL,{params});
        return response.data;
    }

    // Фиксация номера страницы для последовательных запросов
    incrementPage() {
        this.page += 1;
    }

    // Сброс номера страницы
    resetPage() {
        this.page = 1;
    }

    // Максимальное количество фотографий
    maxCards(value) {
        this.totalCards = value;
    }

    // Текущее количество найденных фотографий
    renderedCards(value) {
        this.shownCards += value;
    }

    // Сброс текущего количества найденных фотографий
    renderedCardsReset() {
        this.shownCards = 0;
    }

    // Проверка найено ли максимальное количество
    ifMaxCards() {
        return (this.shownCards >= this.totalCards);
    }

    // Геттер и сеттер
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};