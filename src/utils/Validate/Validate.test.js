import {Validate} from './Validate';

describe('Validate Class', () => {
  beforeEach(() => {
    const input = document.createElement('input');

    input.className = 'field__input';
    input.setAttribute('required', true);
    input.type = 'text';

    document.body.appendChild(input);
  });

  afterEach(() => {
    const message = document.body.querySelector('.field__message-danger');
    document.body.querySelector('input').remove();

    if (message) {
      message.remove();
    }
  });

  test('Add danger class to input on validation error', () => {
    const input = document.body.querySelector('.field__input');

    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(input.className).toBe('field__input-danger');
  });

  test('Remove danger class from input on validation error', () => {
    const input = document.body.querySelector('.field__input');

    input.className = 'field__input-danger';
    input.value = 'test';

    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(input.className).toBe('field__input');
  });

  test('Create message div if data attribute exists', () => {
    const input = document.body.querySelector('.field__input');

    input.setAttribute('data-valueMissing', 'This field is required');
    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(
      input.parentNode.querySelector('.field__message-danger')
    ).not.toBeNull();
  });

  test('Show custom error message from data-attribute', () => {
    const input = document.body.querySelector('.field__input');

    input.setAttribute('data-valueMissing', 'This field is required');
    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(
      input.parentNode.querySelector('.field__message-danger').innerHTML
    ).toBe('This field is required');
  });
});
