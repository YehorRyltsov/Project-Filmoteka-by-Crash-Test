const refs = {
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
};

function openModalReview() {
  refs.modal.classList.remove('is-hidden');
  refs.body.classList.add('no-scroll');
  refs.modal.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPressExit);
}

export function onCardClick(e) {
  e.preventDefault();
  const сardId = e.target.closest('li').dataset.idcard;
  console.log(сardId);
  openModalReview();
  fetchMoveId(сardId)
    .then(renderModalCardReview)
    .catch(error => console.error(error));
}

async function fetchMoveId(сardId) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${сardId}?api_key=cfb01d01cf730c010b0d096c15822b40`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}

function closeModalReview() {
  refs.modal.classList.add('is-hidden');
  refs.body.classList.remove('no-scroll');
  refs.modal.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscKeyPressExit);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModalReview();
  }
}

function onEscKeyPressExit(event) {
  if (event.code === 'Escape') {
    closeModalReview();
  }
}

function renderModalCardReview(move) {
  refs.modal.innerHTML = `<div class="modal-review">
    <button
    type ="button" class="review__btn-close close"
    >
    </button>
    <div class="modal-review__body">
      <div class="modal-review__card">
        <img class="modal-review__content" 
        src="https://image.tmdb.org/t/p/w500${move.poster_path}"
            ? "https://image.tmdb.org/t/p/w500${move.poster_path}"
            : "./images/imgModalReview.jpg" 
            alt="${move.original_title}" />
      </div>
      <div class="modal-review__container">
        <h2 class="modal-review__title">${move.title}</h2>
        <div class="modal-review__items">
          <div class="modal-review__item list">Vote / Votes</div>
          <p class="modal-review__item--grid">
            <span class="modal-review__item--rating"> ${move.vote_average.toFixed(
              1
            )} </span>
            <span class="modal-review__slash"> / </span>
            <span class="modal-review__item--dark"> ${move.vote_count.toFixed(
              0
            )} </span>
          </p>
          <div class="modal-review__item list">Popularity</div>
          <p class="modal-review__item--dark">${move.popularity.toFixed(1)} </p>
          <div class="modal-review__item list">Original Title</div>
          <p class="modal-review__item--dark">${move.original_title}</p>
          <div class="modal-review__item list">Genre</div>
          <p class="modal-review__item--dark">${move.genres
            .map(genre => genre.name)
            .join(', ')} </p>
        </div>
        <p class="modal-review__subtitle">About</p>
        <p class="modal-review__about">${
          move.overview
            ? move.overview
            : 'An excellent film and worthy of your attention!'
        }
        </p>
        <div class="modal-review__btn-container">
          <button
    type="button"
    id="dima-btn-watched"
    class="d-btn-watched library-btn active"
  >
    <span class="d-add-watched">ADD TO WATCHED</span>
    <span class="d-remove-watched hide">REMOVE WATCHED</span>
  </button>
          <button
    type="button"
    id="dima-btn-queue"
    class="d-btn-queue library-btn active"
  >
    <span class="d-add-queue">ADD TO QUEUE</span>
    <span class="d-remove-queue hide">REMOVE QUEUE</span>
  </button>
        </div>
      </div>
    </div>
  </div>`;

  const closeModalBtn = document.querySelector('.review__btn-close');
  closeModalBtn.addEventListener('click', closeModalReview);
}
