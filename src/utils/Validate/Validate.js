export class Validate {
  constructor(inputs = []) {
    this.inputs = inputs;
    this.bind();
  }

  bind() {
    this.inputs.forEach(input => {
      input.addEventListener('invalid', this.validateInput.bind(this));
      input.addEventListener('blur', this.validateInput.bind(this));
      input.addEventListener('input', event => {
        this.validateInput(event, false);
      });
    });
  }

  validateInput(event, showMessage = true) {
    const input = event.target;
    const message = input.parentNode.querySelector('.field__message-danger');

    if (input.validity.valid) {
      if (message) {
        message.remove();
      }

      input.className = 'field__input';
    } else if (showMessage) {
      const messageContent = this.getInputMessageContent(input);

      if (messageContent) {
        if (message) {
          message.innerHTML = messageContent;
        } else {
          const newMessage = document.createElement('div');

          newMessage.className = 'field__message-danger';
          newMessage.innerHTML = messageContent;

          input.parentNode.prepend(newMessage);
        }
      }

      input.className = 'field__input-danger';
    }

    event.preventDefault();
  }

  getInputMessageContent(input) {
    if (input.validity.typeMismatch) {
      return input.getAttribute(`data-${input.type}Mismatch`);
    } else {
      for (const invalidKey in input.validity) {
        const messageContent = input.getAttribute(`data-${invalidKey}`);

        if (messageContent && input.validity[invalidKey]) {
          return messageContent;
        }
      }

      return '';
    }
  }
}
