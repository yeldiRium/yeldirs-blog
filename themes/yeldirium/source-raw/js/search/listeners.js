import {
  moveSelection,
  openSearchBox,
  hideSearchBox,
  isSearchBoxOpen,
  followLink,
  renderSearchResult
} from "./dom";
import { activeSelection, searchItems } from "./selectors";
import { search } from "./search";

let touchStart = false;

const setupGlobalListeners = (config, globalElements, data) => {
  globalElements.input.addEventListener("input", event => {
    const keywordString = event.target.value;

    renderSearchResult(
      config,
      globalElements,
      search(config, data, keywordString)
    );

    setupSearchResultListeners(globalElements);
  });

  globalElements.searchBar.addEventListener("click", () => {
    openSearchBox(globalElements);
  });
  globalElements.searchBar.addEventListener("focus", () => {
    openSearchBox(globalElements);
  });

  globalElements.closeButton.addEventListener("click", () => {
    hideSearchBox(globalElements);
  });
  globalElements.closeButton.addEventListener("touchend", () => {
    if (!touchStart) {
      return;
    }

    hideSearchBox(globalElements);
    touchStart = false;
  });

  document.addEventListener("keydown", event => {
    if (!isSearchBoxOpen(globalElements)) {
      return;
    }

    switch (event.keyCode) {
      // ESC
      case 27: {
        hideSearchBox(globalElements);
        break;
      }
      // UP
      case 38: {
        moveSelection(globalElements, -1);
        break;
      }
      // Down
      case 40: {
        moveSelection(globalElements, 1);
        break;
      }
      // ENTER
      case 13: {
        const selectedElement = activeSelection(globalElements.container);
        if (selectedElement !== null) {
          followLink(selectedElement);
        }
      }
    }
  });
  document.addEventListener("touchstart", () => {
    touchStart = true;
  });
  document.addEventListener("touchmove", () => {
    touchStart = false;
  });
};

const setupSearchResultListeners = globalElements => {
  for (const searchItemElement of searchItems(globalElements.container)) {
    searchItemElement.addEventListener("click", () => {
      followLink(searchItemElement);
    });
    searchItemElement.addEventListener("touchend", () => {
      if (!touchStart) {
        return;
      }

      followLink(searchItemElement);
      touchStart = false;
    });
  }
};

export { setupGlobalListeners, setupSearchResultListeners };
