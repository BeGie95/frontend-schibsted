import { API_URL } from './contants';

export function Controller({ model, view }) {
  const filters = {
    fashion: true,
    sport: false,
  };
  let sort = null;

  const renderView = () => {
    view.render(model.getData({ filters, sort }));
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

  const sortButtons = ({ sort: sortParam }) => {
    sort = sortParam;
    renderView();
  };

  view.bindToggleCheckboxes(toggleCheckboxes);
  view.bindSortButtons(sortButtons);

  return Object.freeze({
    handleOnLoad,
  });
}
