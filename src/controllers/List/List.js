import {Users} from '../../models';

export class List {
  constructor() {
    this.container = document.querySelector('.container.list');
    this.rowTemplate = document.getElementById('list-row-template');

    this.loadData();
  }

  async loadData() {
    const users = await new Users();
    const rows = this.container.querySelectorAll('.list__row');

    if (rows.length > 1) {
      rows.forEach(row => {
        if (row.className.indexOf('header') === -1) {
          row.remove();
        }
      });
    }

    users.forEach(user => {
      const row = document.importNode(this.rowTemplate.content, true);
      const cols = row.querySelectorAll('.list__col');

      row
        .querySelector('.list__button-success')
        .setAttribute('href', `#edit/${user.cpf}`);

      row
        .querySelector('.list__button-danger')
        .setAttribute('data-cpf', user.cpf);

      Object.entries(user).forEach(([key, value]) => {
        Array.prototype.find.bind(cols)(
          col => col.className.indexOf(key) > -1
        ).innerHTML = value;
      });

      this.container.appendChild(row);
    });

    this.bind();
  }

  bind() {
    this.container.querySelectorAll('.list__button-danger').forEach(button => {
      button.addEventListener('click', this.handleDelete.bind(this));
    });
  }

  async handleDelete(event) {
    event.preventDefault();

    const users = await new Users();
    const cpf = event.target.getAttribute('data-cpf');
    const index = users.map(user => user.cpf).indexOf(cpf);

    users.splice(index, 1);

    this.loadData();
  }
}
