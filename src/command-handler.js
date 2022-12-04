import { exit, stdout, stderr } from 'process';
import { EOL } from 'os';
import { Transform } from 'stream';

import { writeInviteMessage } from './utils.js';
import { commandCode } from './const.js';
import { up } from './navigation.js';

export const commandHandler = new Transform({
  transform(chunk, encoding, callback) {
    const command = chunk.toString().replace(EOL, '').toUpperCase();

    stdout.write(`command is ${command}${EOL}`);

    switch (command) {
      case commandCode.exit:
        exit();

      case commandCode.up:
        up();
        break;

      default:
        stdout.write(`Invalid input${EOL}`);
        break;
    }

    writeInviteMessage();

    callback();
  },
});
