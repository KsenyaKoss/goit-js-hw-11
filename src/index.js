import Notiflix from 'notiflix';
import fetchPictures from './api-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let galleryLightBox = new SimpleLightbox('.gallery a');

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
  console.log(searchQuery);
  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    fetchPictures(searchQuery, page, perPage).then(data => {
      page = 1;
      if (data.data.hits.length === 0) {
        refs.btnLoadMore.style.display = 'none';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else if (data.data.totalHits < perPage) {
        renderPictures(data);
        Notiflix.Notify.info(`That's all what we've found.`);
        return;
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${data.data.totalHits} images.`
        );
        renderPictures(data);
        galleryLightBox.refresh();
        page += 1;
        refs.btnLoadMore.style.display = 'block';
      }
    });
  }
}

function onLoadMore() {
  fetchPictures(searchQuery, page, perPage).then(data => {
    let shownPictures = page * perPage;
    if (data.data.hits.length < perPage && data.data.hits.length !== 0) {
      renderPictures(data);
      refs.btnLoadMore.style.display = 'none';
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      return;
    } else if (data.data.totalHits === shownPictures) {
      renderPictures(data);
      refs.btnLoadMore.style.display = 'none';
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      return;
    } else {
      renderPictures(data);
      galleryLightBox.refresh();
      page += 1;
    }
  });
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
        <a href="${largeImageURL}" class="gallery__link" >
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
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
        </a>
        </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', photoCard);
}
