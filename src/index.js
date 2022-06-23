import ModalAPI from './js/components/filmModal/ModalApi';
import FooterModal from './js/components/main/footerModal/footerModal';

import mainPage from './js/mainPageClass';

mainPage.prototype.renderLoaderSquare(true);

let renderPage = new mainPage();

renderPage.onChangePage();
renderPage.renderFooter();

new ModalAPI();

new FooterModal();
