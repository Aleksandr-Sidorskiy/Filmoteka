import { getMovie, getImage } from '../../API/api';

export default class ModalAPI {
    constructor() {
        this.renderBackdropMarkup();
        this.refs = {
        cardContainer: document.querySelector('main'),
        backdrop: document.querySelector('.backdrop'),
        modalBody: document.querySelector('.modal'),
        closeBtn: document.querySelector('.modal__close-btn')
        }
        this.refs.cardContainer.addEventListener('click', this.openFilmCard.bind(this));
         // CLOSE MODAL
        this.refs.backdrop.addEventListener('click', this.onBackdropClick.bind(this));
        // window.addEventListener('keydown', this.onEscKeyPress.bind(this));
        this.refs.backdrop.addEventListener('keydown', this.onEscKeyPress.bind(this));
         // END CLOSE MODAL
    }

    async openFilmCard(evt) {
    
        const targetTag = evt.target.parentNode.classList.contains('film__card');

        if (!targetTag) {
            return;
        }

        const movieId = evt.target.parentNode.id;
        const data = await getMovie(movieId);
        const moviePath = data.data.poster_path;
        const movieImage = await getImage(moviePath);
        const movieGenres = Object.values(data.data.genres).map(genres => genres.name).join(' ')

        this.refs.backdrop.classList.remove('is-hidden');
        this.refs.closeBtn.addEventListener('click', this.closeModal.bind(this));

        return this.refs.modalBody.innerHTML =
        `<div class="modal__image-wrapper">
        <img src=${movieImage} class="modal__image" >
        </div>
        <div class="modal__content">
        <h2 class="modal__title">${data.data.title}</h2>
        <div class="modal__film-info">
        <div class="film-info__wrapp">
        <p class="film-info__property">Vote / Votes</p>
        <p class="film-info__value">${data.data.vote_average} / ${data.data.vote_count}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Popularity</p>
        <p class="film-info__value">${data.data.popularity}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Original Title</p>
        <p class="film-info__value film-info__value--big">${data.data.original_title}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Genre</p>
        <p class="film-info__value">${movieGenres}</p>
        </div>
        </div>
        <div class="modal__overview">
        <p class="overview__title">About</p>
        <p class="overview__text">${data.data.overview}</p>
        </div>
        <div class="modal__buttons">
        <button class="button button__orange">add to Watched</button>
        <button class="button">add to queue</button>
        </div>
        </div>`
    }    
   
    // CLOSE MODAL
      onBackdropClick(event) {
      if (event.currentTarget === event.target) {
        console.log(this);
        this.closeModal();
      }
      }

      onEscKeyPress (event) {
      const ESC_KEY_CODE = "Escape";
      if (event.code === ESC_KEY_CODE) {
      console.log('Клік по кнопці')
      this.closeModal()
      }
      }
    // END CLOSE MODAL

    
    closeModal() {
        this.refs.backdrop.classList.add('is-hidden');
    }

    renderBackdropMarkup() {
        const backdropMarkup = `<div class="backdrop is-hidden">
        <div class="modal">
        <button class="modal__close-btn"></button>
        </div></div>`
        
        document.body.insertAdjacentHTML('beforeend', backdropMarkup);
    }
}


