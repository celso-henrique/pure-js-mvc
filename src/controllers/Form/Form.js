import {NumericMask, Validate} from '../../utils';
import {Users} from '../../models';

export class Form {
  constructor() {
    this.form = document.getElementById('form');
    this.inputs = this.form.querySelectorAll('input');
    this.submitButton = this.form.querySelector('button');

    new NumericMask(this.inputs);
    new Validate(this.inputs);

    this.bind();
  }

  bind() {
    this.form.addEventListener('keyup', this.validateForm.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  validateForm() {
    const isValid = Array.prototype.reduce.bind(this.inputs)(
      (result, input) => (result ? input.validity.valid : result),
      true
    );

    this.setSubmitDisabledStatus(!isValid);
  }

  setSubmitDisabledStatus(status) {
    if (status) {
      this.submitButton.setAttribute('disabled', true);
    } else {
      this.submitButton.removeAttribute('disabled');
    }
  }

  async handleSubmit(event) {
    const users = await new Users();
    const user = Array.prototype.reduce.bind(this.inputs)((user, input) => {
      user[input.name] = input.value;
      return user;
    }, {});

    this.setSubmitDisabledStatus(true);
    this.submitButton.className = 'button__state-loading';
    users.push(user);

    event.preventDefault();
  }
}
