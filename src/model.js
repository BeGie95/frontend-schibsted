export function Model() {
  const data = {
    articles: [],
    error: null,
  };

  const getData = () => {
    return {
      error: data.error,
      articles: data.articles,
    };
  };
  return Object.freeze({
    getData,
  });
}
