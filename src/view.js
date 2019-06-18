export function View() {
  const articles = document.querySelector('.app-main');
  const render = model => {
    console.log(model);
    articles.innerHTML = `
      test render
    `;
  };
  return Object.freeze({
    render,
  });
}
