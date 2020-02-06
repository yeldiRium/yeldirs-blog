import { parseKeywordString } from "./util";

const filter = (keywords, document, fields) => {
  return keywords.every(keyword => {
    for (const field of fields) {
      if (
        document[field] !== undefined &&
        document[field].toUpperCase().indexOf(keyword) > -1
      ) {
        return true;
      }
    }
    return false;
  });
};

const filterFactory = keywords => ({
  post: document => filter(keywords, document, ["title", "text"]),
  page: document => filter(keywords, document, ["title", "text"]),
  category: document => filter(keywords, document, ["name", "slug"]),
  tag: document => filter(keywords, document, ["name", "slug"])
});

const weigh = (keywords, document, weights) => {
  let value = 0;

  for (const keyword of keywords) {
    const regexp = new RegExp(keyword, "img");

    for (const field in weights) {
      if (document[field] !== undefined) {
        const matches = document[field].matchAll(regexp);

        if (matches !== null) {
          value += matches.length * weights[field];
        }
      }
    }
  }

  return value;
};

const weighFactory = (weights, keywords) => ({
  post: document => weigh(keywords, document, weights.post),
  page: document => weigh(keywords, document, weights.page),
  category: document => weigh(keywords, document, weights.category),
  tag: document => weigh(keywords, document, weights.tag)
});

const search = (config, data, keywordString) => {
  const keywords = parseKeywordString(keywordString);

  const weighs = weighFactory(config.weights, keywords);
  const filters = filterFactory(keywords);
  return {
    posts: data.posts
      .filter(filters.post)
      .map(post => ({ post, weight: weighs.post(post) }))
      .sort((a, b) => b.weight - a.weight)
      .map(({ post }) => post)
      .slice(0, config.resultsPerSection),
    pages: data.pages
      .filter(filters.page)
      .map(page => ({ page, weight: weighs.page(page) }))
      .sort((a, b) => b.weight - a.weight)
      .map(({ page }) => page)
      .slice(0, config.resultsPerSection),
    categories: data.categories
      .filter(filters.category)
      .map(category => ({ category, weight: weighs.category(category) }))
      .sort((a, b) => b.weight - a.weight)
      .map(({ category }) => category)
      .slice(0, config.resultsPerSection),
    tags: data.tags
      .filter(filters.tag)
      .map(tag => ({ tag, weight: weighs.tag(tag) }))
      .sort((a, b) => b.weight - a.weight)
      .map(({ tag }) => tag)
      .slice(0, config.resultsPerSection)
  };
};

export { filter, filterFactory, weigh, weighFactory, search };
