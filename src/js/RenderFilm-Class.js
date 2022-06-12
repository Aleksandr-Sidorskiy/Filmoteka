import { getTrendingMovies, getImage } from './API/api.js';
import jsonGenres from './API/jsonGenres.js';

import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate.js';

export default class RenderFilm {
  constructor() {
    this.renderLink = document.querySelector('body');

    this.fetchAndRenderTemplates();
  }

  fetchAndRenderTemplates = async (pageNumber = 1) => {
    const { data } = await getTrendingMovies(pageNumber);
    const { results } = data;

    const template = results
      .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
        const wordGenres = this.genresFromId(genre_ids);
        const date = release_date.slice(0, 4);
        const image = getImage(poster_path);

        return filmCardTemplate(image, original_title, wordGenres, date, id);
      })
      .join('');

    const templateWithContaimer = `<div class="container"><div class="card-container">${template}</div></div> `;

    this.renderLink.insertAdjacentHTML('beforeend', templateWithContaimer);
    return data;
  };

  genresFromId = arrId => {
    const genres = jsonGenres;
    const genresName = [];

    for (let i = 0; i < genres.length; i++) {
      if (genres[i].id === arrId[0]) {
        genresName.push(genres[i].name);
      }

      if (genres[i].id === arrId[1]) {
        genresName.push(genres[i].name);
      }
    }

    if (arrId[3]) {
      genresName.push('other');
    }

    return genresName.join(', ');
  };
}
