import { chdir, cwd, env, exit, stdout, stderr } from 'process';
import { EOL, homedir } from 'os';
import { Transform, pipeline } from 'stream';

import { getUsername } from './src/utils.js';
import { errorCode } from './src/const.js';

const start = () => {
  try {
    const username = getUsername();
    if (!username) {
      throw new Error(errorCode.noUser);
    }
    env.username = username;

    chdir(homedir());

    stdout.write(EOL + `Welcome to the File Manager, ${env.username}!${EOL}`);
    stdout.write(`You are currently in ${cwd()}${EOL}`);

    const mainProcess = new Transform({
      transform(chunk, encoding, callback) {
        const command = chunk.toString().replace(EOL, '');

        stdout.write(`command is ${command}${EOL}`);

        switch (command) {
          case '.exit':
            stdout.write(
              `Thank you for using File Manager, ${env.username}, goodbye!${EOL}`
            );
            process.exit(0);
        }

        stdout.write(`You are currently in ${cwd()}${EOL}`);

        callback();
      },
    });

    pipeline(process.stdin, mainProcess, process.stdout, (error) => {
      if (error) {
        stderr.write(`Operation failed: ${error}${EOL}`);
      }
    });
  } catch (error) {
    switch (error.message) {
      case errorCode.noUser:
        stderr.write(`Please enter your username!${EOL}`);
        break;

      default:
        stderr.write(`${error}${EOL}`);
        break;
    }
    exit();
  }
};

start();
