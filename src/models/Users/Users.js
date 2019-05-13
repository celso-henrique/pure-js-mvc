export class Users {
  constructor() {
    return this.build();
  }

  async build() {
    const localStorageData = localStorage.getItem('users');

    if (!localStorageData) {
      const request = await fetch(
        'https://private-21e8de-rafaellucio.apiary-mock.com/users',
        {method: 'get'}
      );
      const users = await request.json();

      this.updateLocalStorage(users);

      return this.createProxy(users);
    } else {
      const users = JSON.parse(localStorageData);

      return this.createProxy(users);
    }
  }

  createProxy(users) {
    return new Proxy(users, {
      set: this.set.bind(this)
    });
  }

  updateLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  set(users, prop, value) {
    const hasSet = Reflect.set(users, prop, value);

    this.updateLocalStorage(users);

    return hasSet;
  }
}
