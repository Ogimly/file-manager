import { EOL, homedir } from 'os';
import readline from 'readline';

import { getUsername, writeInviteMessage, writeFailedMessage } from './src/utils.js';
import { input, output, errOutput, errorCode } from './src/const.js';
import { commandHandler } from './src/command-handler.js';

const start = () => {
  try {
    const username = getUsername();
    if (!username) {
      throw new Error(errorCode.noUser);
    }
    process.env.username = username;

    process.chdir(homedir());

    output.write(EOL + `Welcome to the File Manager, ${process.env.username}!${EOL}`);
    writeInviteMessage();

    // main event loop
    const interfaceIO = readline.createInterface({ input, output });
    interfaceIO.on('line', commandHandler);
    interfaceIO.on('error', writeFailedMessage);

    // on exit
    process.on('exit', () => {
      output.write(
        `Thank you for using File Manager, ${process.env.username}, goodbye!${EOL}`
      );
      interfaceIO.close();
    });
    process.on('SIGINT', () => process.exit());
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        errOutput.write(`Please enter your username!${EOL}`);
        break;

      default:
        writeFailedMessage(error);
        break;
    }
    process.exit();
  }
};

start();
