const searchBar = () => document.querySelector(".header__header .searchbar");
const main = () => document.querySelector(".ins-search");
const input = () => document.querySelector(".ins-search-input");
const wrapper = () => document.querySelector(".ins-section-wrapper");
const container = () => document.querySelector(".ins-section-container");
const closeButton = () => document.querySelector(".ins-close");
const selectables = container => container.querySelectorAll(".ins-selectable");
const activeSelection = container =>
  container.querySelector(".ins-selectable.active");
const searchItems = container => container.querySelectorAll(".ins-search-item");

export {
  searchBar,
  main,
  input,
  wrapper,
  container,
  closeButton,
  selectables,
  activeSelection,
  searchItems
};
