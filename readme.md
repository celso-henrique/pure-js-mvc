Simple Pure JS MVC
====================
A simple user register app using [Webpack](https://webpack.js.org/) for build and server, [Jest](https://jestjs.io/) for testing, [Less](http://lesscss.org/) and ES6/ES7/ES8. Contains a micro hash router that accepts parameters, a validation class wrapper over HTML5 validityState interface, a numeric mask class that read patterns from data-mask attribute, HTML5 template tag for views, Proxy for model reflection on localStorage and controllers classes.


# Install
Clone this repository then install it dependencies with this command:
```
npm install
```

# Running
Run webpack-dev-server with `npm start` command, it will start the app on [localhost:9000](http://localhost:9000):
```
npm start
```

# Testing
Run unit tests with this command:
```
npm test
```

# Production build
Generate a build into dist folter with this command:
```
npm build
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
