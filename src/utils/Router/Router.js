export class Router {
  constructor(routes = []) {
    this.routes = routes;
    this.bind();
  }

  bind() {
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('load', this.handleHashChange.bind(this));
  }

  handleHashChange() {
    const url = window.location.hash || '/';
    const content = document.getElementById('content');
    const match = (path, url) =>
      url.match(new RegExp(path.replace(/:([^/]+)/g, '([^/]*)')));
    const route = this.routes.find(
      ({path, exact}) => (exact ? path === url : match(path, url))
    );

    if (content) {
      content.innerHTML = '';

      if (route) {
        const template = document.getElementById(route.template);
        const paramsKeys = route.path.match(/:([^/]+)/g);

        if (template) {
          content.appendChild(document.importNode(template.content, true));
        }

        if (typeof route.controller === 'function') {
          const stripedPath = match(route.path, url);
          stripedPath.shift();

          new route.controller(
            stripedPath.reduce((params, value, index) => {
              params[paramsKeys[index].replace(':', '')] = value;
              return params;
            }, {})
          );
        }
      }
    }
  }
}
