import {NumericMask} from './NumericMask';

describe('NumericMask Class', () => {
  test('Expect mask to be applied after input event', () => {
    const input = document.createElement('input');

    input.type = 'text';
    input.setAttribute('data-mask', '000-000');
    input.value = '111111';

    new NumericMask([input]);
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('111-111');
  });

  test('Expect mask to be applied correctly', () => {
    const mask = new NumericMask();

    expect(mask.applyMask('12345678910', '000.000.000-00')).toBe(
      '123.456.789-10'
    );
  });

  test('Expect to trim text longer than mask', () => {
    const mask = new NumericMask();

    expect(mask.applyMask('1234567891234567', '000.000.000-00')).toBe(
      '123.456.789-12'
    );
  });
});
