import {List} from './List';
import {fetchMock} from '../../helpers';
import {Users} from '../../models';

global.fetch = fetchMock;

describe('List Controller Class', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    const rowTemplate = document.createElement('template');
    const template = document.createElement('template');

    container.className = 'container list';

    rowTemplate.id = 'list-row-template';
    template.id = 'list-template';

    template.innerHTML = `
      <div class="container list">
        <div class="list__row">
          <div class="list__col-title">
            Nome
          </div>
          <div class="list__col-title">
            E-mail
          </div>
          <div class="list__col-title">
            CPF
          </div>
          <div class="list__col-title">
            Telefone
          </div>
          <div class="list__col-title">
            Ações
          </div>
        </div>
      </div>
    `;

    rowTemplate.innerHTML = `
      <div class="list__row">
        <div class="list__col name"></div>
        <div class="list__col email"></div>
        <div class="list__col cpf"></div>
        <div class="list__col phone"></div>
        <div class="list__col-wrap">
          <a class="list__button-danger">Excluir</a>
          <a href="#edit" class="list__button-success">Editar</a>
        </div>
      </div>
    `;

    document.body.appendChild(rowTemplate);
    document.body.appendChild(container);
  });

  afterEach(() => {
    const container = document.body.querySelector('.container');
    const rowTemplate = document.body.querySelector('#list-row-template');

    container.remove();
    rowTemplate.remove();

    localStorage.removeItem('users');
  });

  test('Expect to render data on load', async () => {
    const list = new List();
    await list.loadData();

    const rows = document.querySelectorAll('.list__row');

    expect(rows.length).toBe(3);
  });

  test('Expect to update data on every load', async () => {
    const list = new List();
    await list.loadData();

    const users = await new Users();

    users.push({
      name: 'My name 4',
      cpf: '74668869066',
      phone: '11987654321',
      email: 'myemail4@test.com.br'
    });

    await list.loadData();

    const rows = document.querySelectorAll('.list__row');

    expect(rows.length).toBe(4);
  });

  test('Expect to delete item on click', async () => {
    const list = new List();
    await list.loadData();

    const users = await new Users();
    users.pop();

    await list.loadData();
    const rows = document.querySelectorAll('.list__row');

    expect(rows.length).toBe(2);
  });
});
