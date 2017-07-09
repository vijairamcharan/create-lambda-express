const fs = require('fs');
const path = require('path');

const program = require('commander');
const kopy = require('kopy');
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const spawn = require('cross-spawn');
const makeDir = require('make-dir');

const cwd = process.cwd();
const version = require('./package.json').version;

let folderName;

const folderExists = (folder) => {
  try {
    fs.statSync(folder);
  } catch (e) {
    return false;
  }
  return true;
}

const runYarn = () => {
  return new Promise((resolve, reject) => {
    let command;
    command = 'yarnpkg';
    args = [];

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
  });
}

var main = () => {
  program
    .version(version)
    .arguments('<folder-name>')
    .usage(`${chalk.green('<folder-name>')} [options]`)
    .action(name => {
      folderName = name;
    })
    .parse(process.argv);

  if (typeof folderName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('Examples:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('service')} will create a folder named service and create your project skeleton there.`);
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('customer/addressValidator')} to create a service in the folder customer/addressValidator. The Lambda will be named customer-addressChecker.`);
    console.log();
    process.exit(1);
  };

  const targetPath = path.join(cwd, folderName);
  if (folderExists(targetPath)) {
    console.error('Folder already exists. Choose another name.');
    process.exit(1);
  }

  makeDir.sync(targetPath);

  const templatePath = path.join(__dirname, 'template');
  const serviceName = folderName.replace('/', '-').replace('\\', '-');

  kopy(templatePath, targetPath, {
    clean: true,
    data: {
      folderName,
      serviceName
    },
    template: require('jstransformer-handlebars')
  })
    .then(({ files }) => {
      process.chdir(targetPath);
      return runYarn();
    })
    .then(_ => {
      console.log('Lambda successfully created.')
      console.log();
      console.log('Now run:');
      console.log(`  ${chalk.green('cd ' + folderName)}`);
      console.log(`  ${chalk.green('yarn start')}`);
    })
    .catch(err => {
      console.log(err.stack)
    })
};


module.exports = main;
