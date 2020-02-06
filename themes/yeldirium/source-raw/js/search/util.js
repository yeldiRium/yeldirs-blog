const parseKeywordString = keywordString => {
  return keywordString
    .split(" ")
    .filter(keyword => keyword !== "")
    .map(keyword => keyword.toUpperCase());
};

export { parseKeywordString };
