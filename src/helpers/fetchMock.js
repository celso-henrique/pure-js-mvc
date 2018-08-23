export const fetchMock = async () => ({
  json: async () => [
    {
      name: 'My name 1',
      cpf: '04080757247',
      phone: '11987654321',
      email: 'myemail1@test.com.br'
    },
    {
      name: 'My name 2',
      cpf: '77797584192',
      phone: '11987654321',
      email: 'myemail2@test.com.br'
    },
    {
      name: 'My name 3',
      cpf: '45486737688',
      phone: '11987654321',
      email: 'myemail3@test.com.br'
    }
  ]
});
