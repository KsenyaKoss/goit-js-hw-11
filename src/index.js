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
refs.btnLoadMore.style.display = 'none';
refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(ev) {
  ev.preventDefault();
  refs.gallery.innerHTML = '';
  searchQuery = ev.currentTarget.elements.searchQuery.value;
  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    refs.btnLoadMore.style.display = 'block';
    fetchPictures(searchQuery, page, perPage).then(data => {
      console.log(data);
      renderPictures(data);
      let shownPictures = page * perPage;
      console.log(shownPictures);
      if (data.data.totalHits <= shownPictures) {
        refs.btnLoadMore.style.display = 'none';
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        return;
      }
      page += 1;
    });
  }
}

function onLoadMore() {
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
        </div>
        </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', photoCard);
}
