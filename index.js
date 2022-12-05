import { homedir } from 'os';
import readline from 'readline';

import * as utils from './src/utils.js';
import { errorCode, invalidInput } from './src/const.js';
import { commandHandler } from './src/command-handler.js';

const start = () => {
  try {
    const username = utils.getUsername();
    if (!username) {
      throw new Error(errorCode.noUser);
    }
    process.env.username = username;

    process.chdir(homedir());

    utils.writeMessage(`Welcome to the File Manager, ${process.env.username}!`);
    utils.writeInviteMessage();

    // main event loop
    const interfaceIO = readline.createInterface(utils.IO);
    interfaceIO.on('line', commandHandler);
    interfaceIO.on('error', utils.writeFailedMessage);

    // on exit
    process.on('exit', () => {
      utils.writeMessage(
        `Thank you for using File Manager, ${process.env.username}, goodbye!`
      );
      interfaceIO.close();
    });
    process.on('SIGINT', () => process.exit());
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        utils.writeInvalidInputMessage(invalidInput.noUser);
        break;

      default:
        utils.writeFailedMessage(error);
        break;
    }
    process.exit();
  }
};

start();
