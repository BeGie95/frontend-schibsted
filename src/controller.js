export function Controller({ model, view }) {
  const renderView = () => {
    view.render(model.getData());
  };

  const handleOnLoad = () => {
    renderView();
  };

  return Object.freeze({
    handleOnLoad,
  });
}
