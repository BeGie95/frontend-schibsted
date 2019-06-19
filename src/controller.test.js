import { Controller } from './controller';

describe('controller test', () => {
  let controller;
  let model;
  let view;

  beforeEach(() => {
    fetch.resetMocks();
    model = {
      getData: jest.fn(),
      setArticles: jest.fn(),
      setError: jest.fn(),
    };
    view = {
      bindCheckboxes: jest.fn(),
      bindButtons: jest.fn(),
      render: jest.fn(),
    };

    controller = Controller({
      model,
      view,
    });
  });

  it('should call api with proper url for fashion articles and set articles model', () => {
    fetch.mockResponseOnce(JSON.stringify({ articles: [] }));

    controller.loadData('fashion').then(() => {
      expect(model.setArticles.mock.calls[0][0]).toEqual({ articles: [] });
    });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      'http://localhost:6010/articles/fashion',
    );
  });

  it('should call api with proper url for sport articles and set articles model', () => {
    fetch.mockResponseOnce(JSON.stringify({ articles: [] }));

    controller.loadData('sports').then(() => {
      expect(model.setArticles.mock.calls[0][0]).toEqual({ articles: [] });
    });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      'http://localhost:6010/articles/sports',
    );
  });

  it('should handle error message from api', () => {
    fetch.mockRejectOnce('fake error message');

    controller.loadData('sports').then(() => {
      expect(model.setError.mock.calls[0][0]).toEqual({
        error: 'fake error message',
      });
    });
  });
});
