'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');
const crypto = require('crypto');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const sortPackageJson = require('sort-package-json');
const config = require('./config');

function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // Fragment locator
  return Boolean(pattern.test(str));
}

function checkForChar(excludeCharArray, char) {
  excludeCharArray.some((badChar) => {
    return char === badChar;
  });
}

const getRandomChar = function () {
  const minChar = 33; // !
  const maxChar = 126; // ~
  const char = String.fromCharCode(crypto.randomInt(minChar, maxChar));
  if (["'", '"', '\\'].some((badChar) => char === badChar)) {
    return getRandomChar();
  }

  return char;
};

module.exports = class extends Generator {
  initializing() {
    this.pkg = require('../../package.json');
  }

  prompting() {
    // Branding
    this.log(`
        -----------------------------------------------
        Version  :   ${this.pkg.version}
        Author   :   ${this.pkg.author.name}
        Website  :   ${this.pkg.author.url}
        Github   :   ${this.pkg.repository.url}
        -----------------------------------------------
    `);

    // Have Yeoman greet the user.
    this.log(
      yosay(
        `'allo!\n Welcome to the ${chalk.green(
          'Paradigm Marketing & Creative'
        )} project starter!`
      )
    );

    // Capitalizes the Site Name
    const capitalSiteName = this.appname.replace(/\b\w/g, (l) =>
      l.toUpperCase()
    );

    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: `What do you want to name this project? ${chalk.yellow(
          '(no special characters allowed)'
        )}`,
        default: capitalSiteName,
        validate(input) {
          // Do async stuff
          if (/[~`!#$%^&*+=[\]\\';,/{}|\\":<>?]/g.test(input)) {
            // Pass the return value in the done callback
            return chalk.bgRed.white('No special characters allowed!');
          }

          return true;
        },
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'Which type of project is this?',
        choices: [
          {
            name: `Craft CMS ${chalk.magenta(
              '(https://craftcms.com/docs/3.x/)'
            )}`,
            value: 'craft',
          },
          {
            name: `Bedrock Wordpress ${chalk.magenta(
              '(https://roots.io/bedrock/)'
            )}`,
            value: 'bedrock',
          },
          {
            name: 'Static HTML',
            value: 'html',
          },
        ],
        default: 'craft',
        store: true,
      },
      {
        type: 'input',
        name: 'wordpressTemplateName',
        message: 'What do you want to call your custom wordpress theme?',
        default: (answers) => _.kebabCase(answers.projectName),
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'input',
        name: 'craftSiteName',
        message: 'What do you want to call your Craft 3 site?',
        default: (answers) => answers.projectName,
        when: (answers) => answers.projectType.includes('craft'),
      },
      {
        type: 'input',
        name: 'siteUrl',
        message: 'What is the url for the site?',
        default() {
          return `http://${path.basename(process.cwd())}.test`;
        },
        validate(input) {
          if (validURL(input)) {
            return true;
          }

          return chalk.bgRed.white('Please enter a valid URL.');
        },
        when: (answers) =>
          answers.projectType.includes('craft') ||
          answers.projectType.includes('bedrock'),
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'What is the name of the database?',
        validate(input) {
          if (input === '') {
            return chalk.bgRed.white('Database name cannot be blank.');
          }

          return true;
        },
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'input',
        name: 'dbUser',
        message: 'What is the username for the database?',
        default: 'root',
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'password',
        name: 'dbPassword',
        message(answers) {
          return `What is the password for ${answers.dbUser}?`;
        },
        default: '',
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'input',
        name: 'adminUsername',
        message: 'Enter a username for the admin:',
        default: 'admin',
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'input',
        name: 'adminEmail',
        message: 'Enter the email for the admin:',
        default: 'info@2dimes.com',
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'input',
        name: 'adminPassword',
        message: 'Enter a password for the admin:',
        default: () =>
          Array(...Array(12))
            .map(getRandomChar)
            .join(''),
        when: (answers) => answers.projectType.includes('bedrock'),
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Which additional features would you like to include?',
        choices: [
          {
            name: `Vanilla Lazyload Javascript ${chalk.magenta(
              '(https://github.com/verlok/vanilla-lazyload)'
            )}`,
            value: 'includeLazyload',
            checked: true,
          },
          {
            name: `Alpine.js ${chalk.magenta(
              '(https://github.com/alpinejs/alpine)'
            )}`,
            value: 'includeAlpine',
            checked: true,
          },
          {
            name: `Tailwind CSS - ${chalk.magenta(
              'v2.2.6 (https://github.com/tailwindlabs/tailwindcss/tree/v2.2.6)'
            )}`,
            value: 'includeTailwind',
            checked: true,
          },
          {
            name: `Flickity - ${chalk.magenta(
              'v2.2 (https://flickity.metafizzy.co)'
            )}`,
            value: 'includeFlickity',
            checked: false,
          },
          {
            name: `Swiper - ${chalk.magenta('v7 (https://swiperjs.com/)')}`,
            value: 'includeSwiper',
            checked: false,
          },
          {
            name: `Fancybox - ${chalk.magenta(
              'v4.0.0-beta.0 (https://github.com/fancyapps/ui)'
            )}`,
            value: 'includeFancybox',
            checked: false,
          },
          {
            name: `Greensock Animation Platform GSAP - ${chalk.magenta(
              'v3.7 (https://github.com/greensock/GSAP)'
            )}`,
            value: 'includeGSAP',
            checked: false,
          },
          {
            name: `Bootstrap - ${chalk.magenta('v4.4.0')}`,
            value: 'includeBootstrap',
            checked: false,
          },
        ],
        store: true,
      },
      {
        type: 'confirm',
        name: 'includeJQuery',
        message: `Would you like to include jQuery - ${chalk.magenta(
          'v 3.4'
        )}?`,
        default: false,
        when: (answers) => !answers.features.includes('includeBootstrap'),
      },
    ]).then((answers) => {
      this.projectType = answers.projectType;
      this.wordpressTemplateName = answers.wordpressTemplateName;
      this.craftSiteName = answers.craftSiteName;
      this.siteUrl = answers.siteUrl;
      this.dbName = answers.dbName;
      this.dbUser = answers.dbUser;
      this.dbPassword = answers.dbPassword;

      // Bedrock options
      this.adminUsername = answers.adminUsername;
      this.adminEmail = answers.adminEmail;
      this.adminPassword = answers.adminPassword;

      const { features } = answers;
      const hasFeature = (feat) => features && features.includes(feat);

      // Manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.features = features;
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeTailwind = hasFeature('includeTailwind');
      this.includeAlpine = hasFeature('includeAlpine');
      this.includeLazyload = hasFeature('includeLazyload');
      this.includeFlickity = hasFeature('includeFlickity');
      this.includeSwiper = hasFeature('includeSwiper');
      this.includeFancybox = hasFeature('includeFancybox');
      this.includeGSAP = hasFeature('includeGSAP');
      this.includeJQuery = hasFeature('includeBootstrap')
        ? true
        : answers.includeJQuery;
      this.projectName = answers.projectName;

      this.log(`${chalk.green(this.features)}`);
    });
  }

  writing() {
    const pkgJson = {
      dependencies: {},
      devDependencies: {},
    };

    const templateData = {
      appname: this.projectName,
      appnameKebabCase: () => {
        return _.kebabCase(this.projectName);
      },
      date: new Date().toISOString().split('T')[0],
      name: this.pkg.name,
      version: this.pkg.version,
      projectType: this.projectType,
      wordpressTemplateName: this.wordpressTemplateName,
      craftSiteName: this.craftSiteName,
      siteUrl: this.siteUrl,
      dbName: this.dbName,
      dbUser: this.dbUser,
      dbPassword: this.dbPassword,
      features: this.features,
      includeBootstrap: this.includeBootstrap,
      includeJQuery: this.includeJQuery,
      includeTailwind: this.includeTailwind,
      includeAlpine: this.includeAlpine,
      includeLazyload: this.includeLazyload,
      includeFlickity: this.includeFlickity,
      includeSwiper: this.includeSwiper,
      includeFancybox: this.includeFancybox,
      includeGSAP: this.includeGSAP,

      generateSalt: () => {
        const saltLength = 64;

        return Array(...Array(saltLength))
          .map(getRandomChar)
          .join('');
      },
    };

    const copy = (input, output) => {
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    };

    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(output),
        data
      );
    };

    // ===================================================
    // Create files based on answers
    // ===================================================
    // Render Files
    config.filesToRender.forEach((file) => {
      copyTpl(file.input, file.output, templateData);
    });

    // Render files specific to projectType
    if (typeof config[this.projectType].filesToRender === 'function') {
      config[this.projectType].filesToRender(this).forEach((file) => {
        copyTpl(file.input, file.output, templateData);
      });
    }

    // Copy Files
    config.filesToCopy.forEach((file) => {
      copy(file.input, file.output);
    });

    // Copy files specific to projectType
    if (config[this.projectType].filesToCopy !== 'undefined') {
      config[this.projectType].filesToCopy.forEach((file) => {
        copy(file.input, file.output);
      });
    }

    // Create extra directories
    config.dirsToCreate.forEach((item) => {
      mkdirp(item);
    });

    // Create extra directories specific to projectType
    if (config[this.projectType].dirsToCreate === 'function') {
      config[this.projectType].dirsToCreate(this).forEach((item) => {
        mkdirp(item);
      });
    }

    // ===================================================
    // Add npm packages based on project answers
    // ===================================================
    if (this.includeBootstrap) {
      pkgJson.dependencies = {
        bootstrap: '^4.4.0',
        'popper.js': '^1.15.0',
        jquery: '^3.4.1',
      };
    }

    if (this.includeJQuery && !_.has(pkgJson.dependencies, 'jquery')) {
      pkgJson.dependencies.jquery = '^3.4.1';
    }

    if (this.includeAlpine) {
      pkgJson.dependencies.alpinejs = '^3.10.0';
    }

    if (this.includeLazyload) {
      pkgJson.dependencies['vanilla-lazyload'] = '^17.1.3';
    }

    if (this.includeFlickity) {
      pkgJson.dependencies.flickity = '^2.2.0';
    }

    if (this.includeSwiper) {
      pkgJson.dependencies.swiper = '^8.3.2';

      // Copy over sass files
      config.swiper.filesToCopy.forEach((file) => {
        copy(file.input, file.output);
      });
    }

    if (this.includeFancybox) {
      pkgJson.dependencies['@fancyapps/ui'] = '^4.0.17';

      // Copy over sass files
      config.fancybox4.filesToCopy.forEach((file) => {
        copy(file.input, file.output);
      });
    }

    if (this.includeGSAP) {
      pkgJson.dependencies.gsap = 'npm:@gsap/shockingly@^3.11.4';
    }

    if (this.includeTailwind) {
      pkgJson.devDependencies['gulp-tailwindcss-export-config'] = '^1.0.1';
      pkgJson.devDependencies.tailwindcss = '^3.1.6';

      copy('tailwind.config.js', 'tailwind.config.js');
    }

    let newPkgJson = _.merge(
      this.fs.readJSON(this.destinationPath('package.json')),
      pkgJson
    );

    // Sort package.json since it was programmatically created
    newPkgJson = sortPackageJson(newPkgJson);

    this.fs.writeJSON(this.destinationPath('package.json'), newPkgJson);
  }

  install() {
    this.npmInstall();

    if (this.projectType === 'bedrock' || this.projectType === 'craft') {
      this.spawnCommandSync('composer', ['install']);
    }
  }

  end() {
    if (this.projectType === 'bedrock' || this.projectType === 'craft') {
      this.log(
        yosay('allo!\nJust gonna build the frontend files for the first time.')
      );

      this.spawnCommandSync('npm', ['run', 'build']);
    }

    if (this.projectType === 'html') {
      this.log(
        yosay(
          `Thanks for using the Paradigm Starter Kit!\nTry running 'npm run serve' to check out your new fancy project!\nCheers 🍻!`
        )
      );

      return;
    }

    if (this.projectType === 'craft') {
      this.log(
        yosay("g'day!\nGonna run you through `php craft setup` process now.")
      );

      this.spawnCommandSync('php', ['craft', 'setup']);
    }

    if (this.projectType === 'bedrock') {
      this.log(yosay("g'day!\nI'm now going to run 'wp core install' now."));

      this.spawnCommandSync('wp', [
        'core',
        'install',
        `--url=${this.siteUrl}`,
        `--title=${this.projectName}`,
        `--admin_user=${this.adminUsername}`,
        `--admin_email=${this.adminEmail}`,
        `--admin_password=${this.adminPassword}`,
      ]);

      this.log(`
        -----------------------------------------------
        ${chalk.bold.green('Wordpress has been installed! 🥳')}

        You can log in as
        ${chalk.bold.green('Username:')} ${this.adminUsername}
        ${chalk.bold.green('Password:')} ${this.adminPassword}
        -----------------------------------------------`);
    }

    this.log(yosay(`Thanks for using the Paradigm Starter Kit!\nCheers 🍻!`));
  }
};
