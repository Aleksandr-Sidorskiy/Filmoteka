import InfiniteScroll from 'infinite-scroll';
import { getImage, urlTrendingMovies } from './API/api';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import infinityPagination from './components/main/pagination/infinity_scroll';
import fetchAndRender from './fetchAndRenderClass';

import Loader from './components/loader/loader-square';// loader-square

export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);
    this.renderLoader();

    this.renderHeader();

    this.fetchAndRenderTrendingFilms();

    this.renderFooter();

    infinityPagination();

    this.rendenBtnTop();

  }
// =================== fetchAndRenderTrendingFilms ============================
  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();
    this.renderMain(data);
  }
// =================== Loader ============================
  renderLoader() {
    const loader = document.querySelector('.loader-box');
    console.log(loader);
    window.onload = function () {
      setTimeout(function () {
        if (!loader.classList.contains('hiden')) {
          loader.classList.add('hiden')
        }
      }, 600);
    }
  }
// =================== Btn_To_Top ============================
  rendenBtnTop() {
    const elmToTop = ` <div class="to-top"><button class="btn-to-top" data-main="up"></button></div>`;
    this.refs.main.insertAdjacentHTML('afterbegin', elmToTop);
    const btnToTop = document.querySelector('.to-top');
    btnToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    setInterval(function displayBtnScrollTop() {
      if (window.scrollY >= 500) {
        btnToTop.style.display = 'inline-block';
      } else {
        btnToTop.style.display = 'none';
      }
    }, 250);
  }


}
