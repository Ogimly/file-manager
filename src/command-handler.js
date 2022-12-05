import { EOL } from 'os';

import { writeInviteMessage, writeInvalidInputMessage } from './utils.js';
import { output, FileManagerHandlers, invalidInput } from './const.js';

export const commandHandler = async (input) => {
  const userInput = input.trim().toString().replace(EOL, '');
  const [userCommand, ...args] = userInput.split(' ');

  const command = userCommand.toUpperCase();
  output.write(`command is ${command}, args is ["${args.join('", "')}"]${EOL}`);

  const filteredHandler = FileManagerHandlers.filter(
    (handler) => handler.command === command
  );

  if (filteredHandler.length) {
    const handler = filteredHandler[0].handler;
    await handler(...args);
  } else {
    writeInvalidInputMessage(invalidInput.unknownCommand);
  }

  writeInviteMessage();
};
