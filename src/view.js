import { capitalizeFirstLetter } from './utils';

export function View() {
  const articles = document.querySelector('.app-main');
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
  });
}
