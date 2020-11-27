import { openSearchBox } from "./dom";
import {
  searchBar,
  main,
  input,
  wrapper,
  container,
  closeButton,
} from "./selectors";
import { setupGlobalListeners } from "./listeners";

/**
 * Search Plugin
 *
 * Configuration:
 *
 * - config.resultsPerType -       how many results should be shown per content
 *                                 type
 * - config.url -                  the url of the json file from which to load
 *                                 the search data
 *
 * - translation.posts
 * - translation.pages
 * - translation.categories
 * - translation.tags
 * - translation.untitled
 *
 * - weights.post[fieldName] -     the weight that should be given to matches in
 *                                 the field `fieldName` in post documents
 * - weights.page[fieldName] -     the weight that should be given to matches in
 *                                 the field `fieldName` in page documents
 * - weights.category[fieldName] - the weight that should be given to matches in
 *                                 the field `fieldName` in category documents
 * - weights.tag[fieldName] -      the weight that should be given to matches in
 *                                 the field `fieldName` in tag documents
 */
const initialize = async (config) => {
  const globalElements = {
    searchBar: searchBar(),
    main: main(),
    input: input(),
    wrapper: wrapper(),
    container: container(),
    closeButton: closeButton(),
  };

  globalElements.main.parentNode.removeChild(globalElements.main);
  document.body.appendChild(globalElements.main);

  const rawData = await fetch(config.url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      console.error("Loading search data failed.");

      return;
    }
    return response.json();
  });

  const searchData = {
    posts: rawData.posts || [],
    pages: rawData.pages || [],
    categories: rawData.categories || [],
    tags: rawData.tags || [],
  };

  if (location.hash.trim() === "#ins-search") {
    openSearchBox(globalElements);
  }

  setupGlobalListeners(config, globalElements, searchData);

  globalElements.input.dispatchEvent(new Event("input"));
};

export { initialize };
