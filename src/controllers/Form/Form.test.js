import 'isomorphic-fetch';
import {Form} from './Form';

describe('Form Controller Class', () => {
  beforeEach(() => {
    const form = document.createElement('form');
    form.id = 'form';

    document.body.appendChild(form);
  });

  afterEach(() => {
    const form = document.body.querySelector('#form');
    form.remove();
  });

  test('Expect to toggle disabled attribute on keyup event when form is valid', () => {
    const form = document.body.querySelector('#form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    button.setAttribute('disabled', true);
    button.className = 'button';
    input.setAttribute('required', true);
    input.value = 'teste';

    form.appendChild(input);
    form.appendChild(button);

    new Form();
    form.dispatchEvent(new Event('keyup'));

    expect(button.getAttribute('disabled')).toBeNull();
  });

  test('Expect to set button to loading state on submit', async () => {
    const form = document.body.querySelector('#form');
    const button = document.createElement('button');

    button.setAttribute('disabled', true);
    button.className = 'button';
    form.appendChild(button);

    const formController = new Form();
    await formController.handleSubmit(new Event('submit'));

    expect(button.className).toBe('button__state-loading');
  });

  test('Expect to load data when receive param', async () => {
    const form = document.body.querySelector('#form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    button.className = 'button';
    input.name = 'name';

    form.appendChild(button);
    form.appendChild(input);

    const formController = new Form();
    await formController.loadData('04080757247');

    expect(input.value).toBe('My name 1');
  });
});
