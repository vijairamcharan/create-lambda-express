import http from "http";
import app from './src/app';

import openBrowser from 'react-dev-utils/openBrowser';
import detect from 'detect-port';

import chalk from 'chalk';
import find from 'find-process';
import inquirer from 'inquirer';
import { kill, killer } from 'cross-port-killer';

const DEFAULT_PORT = 3000;

const server = http.createServer(app);
let currentApp = app;

let usedPort;

const startServer = ({ port, message }) => {
  console.log('\r');
  console.log(chalk.cyan(message))
  server.listen(port);

  console.log(chalk.cyan('Local Express server started'))
  console.log('\r');
  console.log(`Running lambda {{folderName}} at ${chalk.green.underline.bold(`http://localhost:${port}/`)}`);
  openBrowser(`http://localhost:${port}/`);
}

const startApp = async () => {
  const availablePort = await detect(DEFAULT_PORT);
  if (availablePort == DEFAULT_PORT)
    return startServer({
      port: availablePort,
      message: `Running on port ${availablePort}`
    })

  // Default port was not available
  const occupied = await find('port', DEFAULT_PORT)

  console.log('\r');
  console.log(chalk.cyan(`PORT ${DEFAULT_PORT} IS OCCUPIED. Process running is:`))
  console.log(chalk.cyan(`${occupied[0].cmd}`))
  console.log('\r');

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'processAction',
      message: 'What do you want to do?',
      choices: [
        { value: 'USE_ALTERNATIVE', name: `Use available port ${availablePort} instead` },
        { value: 'KILL_EXISTING', name: `Kill the running process on port ${DEFAULT_PORT}` },
        { value: 'NOTHING', name: 'Nothing' },
      ]
    }
  ]);
  const { processAction } = answer;
  switch (processAction) {
    case 'USE_ALTERNATIVE':
      return startServer({
        port: availablePort,
        message: `Running on alternative port ${availablePort}`
      })

    case 'KILL_EXISTING':
      usedPort = DEFAULT_PORT;
      const killed = await kill(DEFAULT_PORT);

      console.log('killing processes', killed);
      setTimeout(_ => {
        return startServer({
          port: DEFAULT_PORT,
          message: `Killed existing running process. Running on port ${DEFAULT_PORT}`
        })
      }, 1000);
      break;
    default:
      console.log(chalk.cyan(`Doing nothing because of occupied port.`))
      console.log('You can safely quit this process using ^C.');
  }
};

startApp();

if (module.hot) {
  module.hot.accept("./src/app", () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}