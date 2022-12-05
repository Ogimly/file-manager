import { EOL } from 'os';

import { writeInviteMessage, writeInvalidInputMessage } from './utils.js';
import { output, FileManagerHandlers, invalidInput } from './const.js';

export const commandHandler = (input) => {
  const userInput = input.trim().toString().replace(EOL, '');
  const [userCommand, ...args] = userInput.split(' ');

  const command = userCommand.toUpperCase();
  output.write(`command is ${command}, args is ["${args.join('", "')}"]${EOL}`);

  const handler = FileManagerHandlers.filter((handler) => handler.command === command);

  if (handler.length) {
    handler[0].handler(...args);
  } else {
    writeInvalidInputMessage(invalidInput.unknownCommand);
  }

  writeInviteMessage();
};
