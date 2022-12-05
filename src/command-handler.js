import { EOL } from 'os';

import { writeInviteMessage, writeInvalidInputMessage } from './utils.js';
import { input, output, errOutput, commandCode, invalidInput } from './const.js';
import { up, cd } from './navigation.js';

export const commandHandler = (input) => {
  const userInput = input.toString().replace(EOL, '');
  const [command, ...args] = userInput.split(' ');

  output.write(`command is ${command}, args is ${args}${EOL}`);

  switch (command.toUpperCase()) {
    case commandCode.exit:
      process.exit();

    case commandCode.up:
      up();
      break;

    case commandCode.cd:
      cd(...args);
      break;

    default:
      writeInvalidInputMessage(invalidInput.unknownCommand);
      break;
  }

  writeInviteMessage();
};
