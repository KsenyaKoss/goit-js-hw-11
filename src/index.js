import Notiflix from 'notiflix';
import fetchPictures from './api-service';
let searchQuery = '';

let page = 1;
const perPage = 40;

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
refs.btnLoadMore.style.display = 'none'
refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(ev) {
  ev.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  refs.btnLoadMore.style.display = 'none'
  searchQuery = ev.currentTarget.elements.searchQuery.value;
  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    refs.btnLoadMore.style.display = 'block';
    fetchPictures(searchQuery, page, perPage).then(data => {
      let pageQuantity = data.data.totalHits / perPage;
      console.log(pageQuantity);
      if (page > pageQuantity) {
        refs.btnLoadMore.style.display = 'none';
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        return;
      } else  if(page === pageQuantity) {
        refs.btnLoadMore.style.display = 'none'
        console.log(data);
        renderPictures(data);
        page += 1;
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        )
      }
    });
  }
}

function onLoadMore(ev) {
  page += 1;
  fetchPictures(searchQuery, page, perPage).then(data => renderPictures(data));
}

function renderPictures(arr) {
  const photoCard = arr.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <div class="photo-card">
        <a href="${largeImageURL}" class="gallery__link" target="_blank"  rel="noopener noreferrer" >
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}" width="300"/>
         </a>
         <div class="info">
          <p class="info-item">Number of likes:
            <b>  ${likes}</b>
          </p>
          <p class="info-item">Number of views:
            <b>  ${views}</b>
          </p>
          <p class="info-item">Number of comments:
            <b>  ${comments}</b>
          </p>
          <p class="info-item">Number of downloads:
            <b>  ${downloads}</b>
          </p>
        </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', photoCard);
}
