export const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : o => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        // eslint-disable-next-line no-unused-expressions
        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);
