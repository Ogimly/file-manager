import { homedir } from 'os';
import readline from 'readline';

import * as IO from './src/utils/input-output.js';
import { getUsername } from './src/utils/cli.js';
import { errorCode, invalidInput } from './src/const.js';
import { commandHandler } from './src/command-handler.js';

const start = () => {
  try {
    const username = getUsername();
    if (!username) {
      throw new Error(errorCode.noUser);
    }
    process.env.username = username;

    process.chdir(homedir());

    IO.writeMessage(`Welcome to the File Manager, ${process.env.username}!`);
    IO.writeInviteMessage();

    // main event loop
    const interfaceIO = readline.createInterface(IO.interfaceIO);
    interfaceIO.on('line', commandHandler);
    interfaceIO.on('error', IO.writeFailedMessage);

    // on exit
    process.on('exit', () => {
      IO.writeMessage(
        `Thank you for using File Manager, ${process.env.username}, goodbye!`
      );
      interfaceIO.close();
    });
    process.on('SIGINT', () => process.exit());
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        IO.writeInvalidInputMessage(invalidInput.noUser);
        break;

      default:
        IO.writeFailedMessage(error);
        break;
    }
    process.exit();
  }
};

start();
