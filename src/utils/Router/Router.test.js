import {Router} from './Router';

describe('Router Class', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="content" />';
    window.location.hash = '';
  });

  test('Content changes when hash changes', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<template id="test-template">Test</template>'
    );

    const router = new Router([
      {
        path: 'test',
        template: 'test-template'
      }
    ]);

    window.location.hash = '#test';
    router.handleHashChange();

    expect(document.getElementById('content').innerHTML).toBe('Test');
  });

  test('Controller function is called when hash changes', () => {
    const controller = jest.fn();
    const router = new Router([
      {
        path: 'test',
        controller
      }
    ]);

    window.location.hash = '#test';
    router.handleHashChange();

    expect(controller).toBeCalled();
  });

  test('Passing params values to controller', () => {
    const controller = jest.fn();
    const router = new Router([
      {
        path: 'test/:domain/:id/',
        controller
      }
    ]);

    window.location.hash = '#test/easy/1/';
    router.handleHashChange();

    expect(controller).toBeCalledWith(
      expect.objectContaining({
        id: '1',
        domain: 'easy'
      })
    );
  });
});
