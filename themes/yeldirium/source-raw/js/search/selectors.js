const activeSelection = (container) =>
  container.querySelector(".ins-selectable.active");
const closeButton = () => document.querySelector(".ins-close");
const container = () => document.querySelector(".ins-search-container");
const sectionContainer = () => document.querySelector(".ins-section-container");
const input = () => document.querySelector(".ins-search-input");
const main = () => document.querySelector(".ins-search");
const searchBar = () => document.querySelector(".header__header .searchbar");
const searchBarInput = () =>
  document.querySelector(".header__header .searchbar__input");
const searchItems = (container) =>
  container.querySelectorAll(".ins-search-item");
const selectables = (container) =>
  container.querySelectorAll(".ins-selectable");
const wrapper = () => document.querySelector(".ins-section-wrapper");

export {
  activeSelection,
  closeButton,
  container,
  input,
  main,
  searchBar,
  searchBarInput,
  searchItems,
  sectionContainer,
  selectables,
  wrapper,
};
