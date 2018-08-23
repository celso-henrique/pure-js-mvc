export class NumericMask {
  constructor(inputs = []) {
    this.inputs = inputs;
    this.bind();
  }

  bind() {
    this.inputs.forEach(input => {
      input.addEventListener('input', this.handleKeypress.bind(this));
    });
  }

  handleKeypress(event) {
    const input = event.target;
    const mask = input.getAttribute('data-mask');

    if (mask && event.keyCode !== 8) {
      input.value = this.applyMask(input.value, mask);
    }
  }

  applyMask(text, mask) {
    const cleanValue = text.replace(/-|\.|\/|\(|\)| |[^0-9.]/g, '');
    let result = '';
    let textPosition = 0;

    for (var index = 0; index < mask.length; index++) {
      if (!cleanValue.charAt(textPosition)) {
        break;
      }

      if (/[^0-9]+/g.test(mask.charAt(index))) {
        result += mask.charAt(index);
      } else {
        result += cleanValue.charAt(textPosition);
        textPosition++;
      }
    }

    return result;
  }
}
