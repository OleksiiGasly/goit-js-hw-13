import './sass/main.scss';
import galleryTemplate from './templates/gallery-card-template.hbs';
import { Notify } from 'notiflix';
import simpleLightBoxRefresh from './js/simplelightbox';
import Search from './js/search';


const refs = {
    searchFormBtn: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const API_KEY = '22610710-77f064d5489dfe1781c9024b3';
const QUANTITY = 40;
const search = new Search();

refs.searchFormBtn.addEventListener('submit', onSearchBtnClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// Добавление разметки в галлерею
const renderMarkup = hits => {
    refs.galleryEl.insertAdjacentHTML('beforeend', galleryTemplate(hits));
}

// Очистка галлереи
const clearMarkup = () => {
    refs.galleryEl.innerHTML = '';
}

// Клик на кнопку Search
const onSearchBtnClick = e => {
    e.preventDefault();
    refs.loadMoreBtn.classList.add('.is-hidden');

    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    if (searchQuery === '') {
        Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return;
    }

    search.resetPage();
    search.initializeSearchQuery();
    search.fetchItems(API_KEY, QUANTITY)
        .then(data => {
            if (data.hits.length === 0) {
                Notify.info('Sorry, there are no images matching your search query. Please try again.');
                
                if (!maxCards) {
                    refs.loadMoreBtn.classList.remove('.is-hidden');
                }

            return            
            }

            search.incrementPage();
            search.renderedCards(data.hits.length);
            search.maxCards(data.totalHits);
            Notify.success(`Hooray! We found ${data.totalHits} images.`);
            clearMarkup();
            renderMarkup(data.hits);

            if (search.maxCards()) {
                Notify.info("We're sorry, but you've reached the end of search results.");
                return;
            }

            refs.loadMoreBtn.classList.add('.is-hidden');
            simpleLightBoxRefresh();
        })
        .catch(error => console.log(error));
}

// Клик на кнопку Load More
const onLoadMoreBtnClick = () => {
    search.fetchItems(API_KEY, QUANTITY)
    .then(data => {
        search.incrementPage();
        search.renderedCards(data.hits.length);
        renderMarkup(data.hits);

        if (search.maxCards()) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.classList.add('.is-hidden');
            return;
        }

        refs.loadMoreBtn.classList.remove('.is-hidden');
        simpleLightBoxRefresh();
    })
    .catch(error => console.log(error));
}