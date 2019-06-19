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

  const getData = ({ filters, sort }) => {
    return {
      error: data.error,
      // sort mutates orignal reference but here is ok because new reference is created after filtering
      articles: data.articles
        .filter(article => filters[article.category])
        .sort((a, b) => {
          if (sort === 'descending') {
            return b.dateUnix - a.dateUnix;
          }
          if (sort === 'ascending') {
            return a.dateUnix - b.dateUnix;
          }
          return 0;
        }),
    };
  };

  return Object.freeze({
    getData,
    setArticles,
    setError,
  });
}
