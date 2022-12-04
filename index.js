import { chdir, env, exit, stdin, stdout, stderr } from 'process';
import { EOL, homedir } from 'os';
import { pipeline } from 'stream';

import { getUsername, writeInviteMessage } from './src/utils.js';
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

    stdout.write(EOL + `Welcome to the File Manager, ${env.username}!${EOL}`);
    writeInviteMessage();

    // main event loop
    pipeline(stdin, commandHandler, stdout, (error) => {
      if (error) {
        stderr.write(`Operation failed: ${error}${EOL}`);
      }
    });

    // on exit
    process.on('exit', () => {
      stdout.write(`Thank you for using File Manager, ${env.username}, goodbye!${EOL}`);
    });
    process.on('SIGINT', () => {
      exit();
    });
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        stderr.write(`Please enter your username!${EOL}`);
        break;

      default:
        stderr.write(`Operation failed: ${error}${EOL}`);
        break;
    }
    exit();
  }
};

start();
