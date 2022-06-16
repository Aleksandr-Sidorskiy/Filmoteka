import InfiniteScroll from 'infinite-scroll';
import { getImage, urlTrendingMovies } from './API/api';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import fetchAndRender from './fetchAndRender-Class';

export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderHeader();

    this.fetchAndRenderTrendingFilms();

    this.renderFooter();

    this.rendenBtnTop();
  }

  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();
    this.renderMain(data);
  }
  rendenBtnTop() {
    const elmToTop = ` <div class="to-top"> <button class="btn-to-top" data-main="up"></button></div>`;
    this.refs.main.insertAdjacentHTML("afterbegin", elmToTop);
    
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
  
