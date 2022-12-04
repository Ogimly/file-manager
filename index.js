import { chdir, env, exit } from 'process';
import { stdin as input, stdout as output, stderr as errOutput } from 'process';
import { EOL, homedir } from 'os';
import { pipeline } from 'stream';

import { getUsername, writeInviteMessage, writeFailedMessage } from './src/utils.js';
import { errorCode } from './src/const.js';
import { commandHandler } from './src/command-handler.js';

const start = () => {
  try {
    const username = getUsername();
    if (!username) {
      throw new Error(errorCode.noUser);
    }
    env.username = username;

    chdir(homedir());

    output.write(EOL + `Welcome to the File Manager, ${env.username}!${EOL}`);
    writeInviteMessage();

    // main event loop
    pipeline(input, commandHandler, output, (error) => {
      if (error) {
        writeFailedMessage(error);
      }
    });

    // on exit
    process.on('exit', () => {
      output.write(`Thank you for using File Manager, ${env.username}, goodbye!${EOL}`);
    });
    process.on('SIGINT', () => {
      exit();
    });
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        errOutput.write(`Please enter your username!${EOL}`);
        break;

      default:
        writeFailedMessage(error);
        break;
    }
    exit();
  }
};

start();
