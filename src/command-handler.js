import { env, exit, stdout, stderr } from 'process';
import { EOL } from 'os';
import { Transform } from 'stream';

import { writeInviteMessage } from './utils.js';

export const commandHandler = new Transform({
  transform(chunk, encoding, callback) {
    const command = chunk.toString().replace(EOL, '');

    stdout.write(`command is ${command}${EOL}`);

    switch (command) {
      case '.exit':
        stdout.write(`Thank you for using File Manager, ${env.username}, goodbye!${EOL}`);
        exit();
    }

    writeInviteMessage();

    callback();
  },
});
