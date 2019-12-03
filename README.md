# KNP Keskonmange

This cool application helps you deciding where you should eat this morning with
your team mates :)

## Installation

Requires the latest version of :
- docker-ce
- docker-compose

Just clone this repository and install its dependencies:

```bash
$ git clone git@github.com:KnpLabs/keskonmange.git keskonmange
$ cd keskonmange
$ make .env install-deps
```

Then, run it with
```bash
$ make start
```

and browse [http://localhost:3001/](http://localhost:3001/).

### Tests
- [Jest](https://jestjs.io/)
- [Test Renderer](https://reactjs.org/docs/test-renderer.html)

To run the tests :
```bash
$ make test
```
