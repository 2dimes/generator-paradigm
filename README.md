# Paradigm Website Project Generator
> A yeoman generator for web development projects at [Paradigm Marketing & Creative](https://2dimes.com) in Memphis, TN. 
> ![Paradigm Marketing & Creative](https://raw.githubusercontent.com/2dimes/generator-paradigm/master/paradigm-logo.svg)
> Includes a Gulp workflow that uses sass, Webpack, babel.js, image minification, and browsersync. Project type options available for static html, [roots/bedrock](https://roots.io/bedrock/), or [Craft CMS](https://craftcms.com/docs/3.x/).

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

## Installation

First, install [Yeoman](http://yeoman.io) and generator-paradigm using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-paradigm
```

Then generate your new project:

```bash
yo paradigm
```

## Project Types
These are current the options for project types:
1. [Bedrock Wordpress](https://roots.io/bedrock/)
2. [Craft CMS](https://craftcms.com/docs/3.x/)
3. Static HTML

In order to use Bedrock or Craft CMS options, you must have the follow requirements:
* [Composer](https://getcomposer.org/)
* Local Development environment using something like [Larvel Valet](https://laravel.com/docs/8.x/valet), [DDEV](https://ddev.readthedocs.io/en/stable/), or some other development environment like MAMP or XAMP.
* MySQL or PostgreSQL
  - How to install MySQL on Mac using Homebrew - [https://gist.github.com/operatino/392614486ce4421063b9dece4dfe6c21]
  - How to install PostgreSQL on Mac - [https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/]


## License

MIT © [Paradigm Marketing & Creative](https://2dimes.com)


[npm-image]: https://badge.fury.io/js/generator-paradigm.svg
[npm-url]: https://npmjs.org/package/generator-paradigm
[travis-image]: https://travis-ci.com/2dimes/generator-paradigm.svg?branch=master
[travis-url]: https://travis-ci.com/twitcher07/generator-paradigm
[daviddm-image]: https://david-dm.org/twitcher07/generator-paradigm.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/twitcher07/generator-paradigm
