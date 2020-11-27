import { renderSectionForType } from "./elements";
import { selectables } from "./selectors";

const removeChildren = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const scrollToResultElement = (globalElements, targetElement) => {
  const wrapperHeight = globalElements.wrapper.clientHeight;
  const elementTop =
    targetElement.getBoundingClientRect().top - wrapperHeight.scrollTop;
  const elementBottom =
    targetElement.clientHeight + targetElement.getBoundingClientRect().top;

  if (elementBottom > wrapperHeight + globalElements.wrapper.scrollTop) {
    globalElements.wrapper.scrollTop(elementBottom - wrapperHeight);
  }
  if (elementTop < 0) {
    globalElements.wrapper.scrollTop(targetElement.getBoundingClientRect().top);
  }
};

const moveSelection = (globalElements, offset) => {
  const elements = [...selectables(globalElements.container)];

  const selectionIndex = elements.findIndex((element) =>
    element.classList.contains("active")
  );

  if (selectionIndex > -1) {
    elements[selectionIndex].classList.remove("active");
  }

  const newSelectionIndex =
    (selectionIndex + offset + elements.length) % elements.length;
  elements[newSelectionIndex].classList.add("active");
  scrollToResultElement(globalElements.wrapper, elements[newSelectionIndex]);
};

const followLink = (linkElement) => {
  location.href = linkElement.getAttribute("data-url");
};

const renderSearchResult = (config, globalElements, searchResult) => {
  removeChildren(globalElements.container);

  for (const key in searchResult) {
    const section = renderSectionForType(config, key, searchResult[key]);
    if (section !== null) {
      globalElements.container.append(section);
    }
  }
};

const openSearchBox = (globalElements) => {
  globalElements.main.classList.add("show");
  globalElements.input.focus();
};

const hideSearchBox = (globalElements) => {
  globalElements.main.classList.remove("show");
};

const isSearchBoxOpen = (globalElements) => {
  return globalElements.main.classList.contains("show");
};

export {
  removeChildren,
  scrollToResultElement,
  moveSelection,
  followLink,
  renderSearchResult,
  openSearchBox,
  hideSearchBox,
  isSearchBoxOpen,
};
