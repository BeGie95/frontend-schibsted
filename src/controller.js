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

  const toggleCheckboxes = ({ name, checked, endpoint }) => {
    filters[name] = !filters[name];
    if (checked) {
      loadData(endpoint);
    } else {
      renderView();
    }
  };

  view.bindToggleCheckboxes(toggleCheckboxes);

  return Object.freeze({
    handleOnLoad,
  });
}
