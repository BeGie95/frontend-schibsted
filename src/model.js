import { uniqBy } from './utils';
import { MONTHS } from './contants';

export function Model() {
  let data = {
    articles: [],
    error: null,
  };

  const setArticles = ({ articles }) => {
    data = {
      error: null,
      articles: uniqBy([...articles, ...data.articles], 'id').map(article => {
        const [day, month, year] = article.date.split(' ');
        return {
          ...article,
          dateUnix: +new Date(
            year,
            MONTHS.findIndex(monthInner => monthInner === month),
            day,
          ),
        };
      }),
    };
  };

  const setError = ({ error }) => {
    data = { ...data, error };
  };

  const getData = ({ filters }) => {
    return {
      error: data.error,
      articles: data.articles.filter(article => filters[article.category]),
    };
  };

  return Object.freeze({
    getData,
    setArticles,
    setError,
  });
}
