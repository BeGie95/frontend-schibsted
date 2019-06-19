import { API_URL } from './contants';

export function Controller({ model, view }) {
  const filters = {
    fashion: true,
    sport: false,
  };

  const renderView = () => {
    view.render(model.getData({ filters }));
  };

  async function loadData(section) {
    try {
      const response = await fetch(`${API_URL}/articles/${section}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      model.setArticles({ articles: json.articles });
    } catch (error) {
      model.setError({ error });
    } finally {
      renderView();
    }
  }

  const handleOnLoad = () => {
    renderView();
    loadData('fashion');
  };

  return Object.freeze({
    handleOnLoad,
  });
}
