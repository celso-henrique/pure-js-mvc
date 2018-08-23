import './styles/index.less';
import {Router} from './utils';
import {Form, List} from './controllers';

new Router([
  {
    path: '/',
    template: 'form-template',
    exact: true,
    controller: Form
  },
  {
    path: 'edit/:cpf',
    template: 'form-template',
    controller: Form
  },
  {
    path: 'list',
    template: 'list-template',
    controller: List
  }
]);
