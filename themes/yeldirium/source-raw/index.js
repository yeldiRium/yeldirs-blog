/* style */
import 'normalize-css/normalize.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './scss/index.scss';

/* script */
import { insight } from './vendor/insight';

import setupMobileNavigation from './js/mobileNavigation';

insight(window.INSIGHT_CONFIG);

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNavigation();
});
