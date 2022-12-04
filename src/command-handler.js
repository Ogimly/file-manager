import { exit, stdout as output, stderr as errOutput } from 'process';
import { EOL } from 'os';
import { Transform } from 'stream';

import { writeInviteMessage } from './utils.js';
import { commandCode } from './const.js';
import { up, cd } from './navigation.js';

export const commandHandler = new Transform({
  transform(chunk, encoding, callback) {
    const userInput = chunk.toString().replace(EOL, '');
    const [command, ...args] = userInput.split(' ');

    output.write(`command is ${command}, args is ${args}${EOL}`);

    switch (command.toUpperCase()) {
      case commandCode.exit:
        exit();

      case commandCode.up:
        up();
        break;

      case commandCode.cd:
        cd(...args);
        break;

      default:
        output.write(`Invalid input${EOL}`);
        break;
    }

    writeInviteMessage();

    callback();
  },
});
