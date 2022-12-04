import { chdir, cwd, env, exit, stdout, stderr } from 'process';
import { EOL, homedir } from 'os';
import { getUsername } from './src/utils.js';
import { errorCode } from './src/const.js';
import { write } from 'fs';

const start = () => {
  try {
    const username = getUsername();

    if (!username) {
      throw new Error(errorCode.noUser);
    }
    env.username = username;

    chdir(homedir());

    stdout.write(EOL + `Welcome to the File Manager, ${env.username}!` + EOL);
    stdout.write(`You are currently in ${cwd()} :`);

    stdout.write(
      EOL + `Thank you for using File Manager, ${env.username}, goodbye!` + EOL
    );
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        stderr.write('Please enter your username!' + EOL);
        break;

      default:
        stderr.write(error.message);
        break;
    }
    exit();
  }
};

start();
