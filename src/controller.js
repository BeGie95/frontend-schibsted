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

  const handleCheckboxChange = ({ name, checked, endpoint }) => {
    filters[name] = !filters[name];
    if (checked) {
      loadData(endpoint);
    } else {
      renderView();
    }
  };

  const handleButtonClick = ({ sort: sortParam }) => {
    sort = sortParam;
    renderView();
  };

  view.bindCheckboxes(handleCheckboxChange);
  view.bindButtons(handleButtonClick);

  return Object.freeze({
    handleOnLoad,
    loadData,
  });
}
