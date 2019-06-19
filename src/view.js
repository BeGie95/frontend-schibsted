import { capitalizeFirstLetter, $ } from './utils';

export function View() {
  const articles = $('.app-main');
  const fashionCheckbox = $('#fashion');
  const sportCheckbox = $('#sport');
  const descButton = $('#app-sort-desc');
  const ascButton = $('#app-sort-asc');

  const bindToggleCheckboxes = handler => {
    fashionCheckbox.addEventListener('change', ({ target }) => {
      handler({
        name: 'fashion',
        checked: target.checked,
        endpoint: 'fashion',
      });
    });
    sportCheckbox.addEventListener('change', ({ target }) => {
      handler({ name: 'sport', checked: target.checked, endpoint: 'sports' });
    });
  };

  const bindSortButtons = handler => {
    descButton.addEventListener('click', () => {
      handler({
        sort: 'descending',
      });
    });
    ascButton.addEventListener('click', () => {
      handler({
        sort: 'ascending',
      });
    });
  };

  const render = model => {
    articles.innerHTML = `
      ${
        model.error
          ? `<h1>${model.error}</h1>`
          : `
        ${model.articles
          .map(({ image, title, preamble, date }) => {
            let formatedDate = date || '';
            if (formatedDate) {
              const dateArr = formatedDate.split(' ');
              dateArr[1] = capitalizeFirstLetter(dateArr[1].slice(0, 3));
              formatedDate = dateArr.join(' ');
            }
            return `<article>
          <figure class="app-figure">
            ${
              image
                ? `<img  class="app-figure__image" src="${image}" alt="${title ||
                    ''}" />`
                : ''
            }
            <figcaption class="app-figure__figcaption">
              <h2 class="app-figure__title">${title || ''}</h2>
              <span class="app-figure__date">${formatedDate}</span>
              <p class="app-figure__preamble">${preamble || ''}</p>
            </figcaption>
          </figure>
        </article>`;
          })
          .join('')}
      </ul>`
      }
    `;
  };
  return Object.freeze({
    render,
    bindToggleCheckboxes,
    bindSortButtons,
  });
}
