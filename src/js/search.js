import axios from 'axios';

export default class Search {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.cardsTotal = 0;
        this.cardsShown = 0;
    }

    initializeSearchQuery(searchQuery) {
        this.searchQuery = searchQuery;
    }

    // Отправка поискового запроса
    async fetchItems(API_KEY, QUANTITY) {
        const BASE_URL = 'https://pixabay.com/api/';
        const parameters = {
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: QUANTITY,
            page: this.page,
        }
        const response = await axios.get(BASE_URL, {parameters});
        return response.data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    totalCards(value) {
        this.cardsTotal = value;
    }

    renderedCards(value) {
        this.cardsShown += value;
    }

    renderedCardsReset() {
        this.cardsShown = 0;
    }

    maxCards() {
        return (this.cardsShown >= this.cardsTotal);
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

