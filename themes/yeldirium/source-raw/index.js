/* style */
import "normalize-css/normalize.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";

import "./scss/index.scss";

/* script */
import { initialize as initializeSearch } from "./js/search";

import setupMobileNavigation from "./js/mobileNavigation";

initializeSearch(window.SEARCH_CONFIG);

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
});
