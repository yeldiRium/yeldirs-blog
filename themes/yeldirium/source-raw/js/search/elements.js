const renderSearchItem = (config, icon, title, url, slug, preview) => {
  const containerElement = document.createElement("div");
  containerElement.classList.add("ins-selectable");
  containerElement.classList.add("ins-search-item");
  containerElement.dataset["url"] = url;

  const headerElement = document.createElement("header");
  containerElement.appendChild(headerElement);

  const iconElement = document.createElement("i");
  iconElement.classList.add("fa");
  iconElement.classList.add(`fa-${icon}`);
  headerElement.appendChild(iconElement);

  const titleElement = document.createElement("span");
  titleElement.classList.add("ins-title");
  titleElement.textContent =
    title !== null && title !== "" ? title : config.translation["untitled"];
  headerElement.appendChild(titleElement);

  if (slug !== undefined) {
    const slugElement = document.createElement("span");
    slugElement.classList.add("ins-slug");
    slugElement.textContent = slug;
    headerElement.appendChild(slugElement);
  }

  if (preview !== undefined) {
    const previewElement = document.createElement("p");
    previewElement.classList.add("ins-search-preview");
    previewElement.textContent = preview;
    containerElement.appendChild(previewElement);
  }

  return containerElement;
};

const renderSection = (title) => {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("ins-section");

  const headerElement = document.createElement("header");
  headerElement.classList.add("ins-section-header");
  headerElement.textContent = title;

  sectionElement.appendChild(headerElement);

  return sectionElement;
};

const renderSectionForType = (config, type, documents) => {
  if (documents.length === 0) {
    return null;
  }
  let searchItemElements;

  switch (type) {
    case "posts":
    case "pages": {
      searchItemElements = documents.map((document) =>
        renderSearchItem(
          config,
          "file",
          document.title,
          document.permalink,
          undefined,
          document.text.slice(0, 150)
        )
      );
      break;
    }
    case "categories":
    case "tags": {
      searchItemElements = documents.map((document) =>
        renderSearchItem(
          config,
          type === "categories" ? "folder" : "tag",
          document.name,
          document.permalink,
          document.slug,
          undefined
        )
      );
      break;
    }
    default: {
      return null;
    }
  }

  const sectionTitle = config.translation[type];
  const sectionElement = renderSection(sectionTitle);
  for (const searchItemElement of searchItemElements) {
    sectionElement.appendChild(searchItemElement);
  }

  return sectionElement;
};

export { renderSearchItem, renderSection, renderSectionForType };
