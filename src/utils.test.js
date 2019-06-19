import { capitalizeFirstLetter, uniqBy } from './utils';

describe('utils tests', () => {
  const namesArray = [
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Bob' },
    null,
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Jack' },
    undefined,
    { id: 2, name: 'Rob' },
    null,
    undefined,
  ];

  it('should test uniqBy with string predicate argument', () => {
    expect(uniqBy(namesArray, 'id')).toEqual([
      { id: 1, name: 'Tom' },
      null,
      { id: 2, name: 'Jack' },
      undefined,
    ]);
  });
  it('should test uniqBy with function predicate argument', () => {
    expect(uniqBy(namesArray, element => element.name)).toEqual([
      { id: 1, name: 'Tom' },
      { id: 1, name: 'Bob' },
      null,
      { id: 2, name: 'Jack' },
      undefined,
      { id: 2, name: 'Rob' },
    ]);
  });

  it('should capitalizeFirstLetter with lowercase string argument', () => {
    expect(capitalizeFirstLetter('schibsted')).toBe('Schibsted');
  });
  it('should capitalizeFirstLetter with first letter capitalized string argument', () => {
    expect(capitalizeFirstLetter('Schibsted')).toBe('Schibsted');
  });
  it('should capitalizeFirstLetter with string argument with space', () => {
    expect(capitalizeFirstLetter('schibsted task')).toBe('Schibsted task');
  });
});
