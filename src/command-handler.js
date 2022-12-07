import { up, cd, ls } from './navigation.js';
import { os } from './operating-system.js';
import { hash } from './hash-calculation.js';
import { compress, decompress } from './compression.js';
import { cat, add } from './basic-operations.js';
import { EOL } from 'os';

import * as utils from './utils.js';
import { errorCode, invalidInput } from './const.js';

const FileManagerHandlers = [
  { command: '.EXIT', handler: process.exit },
  { command: 'UP', handler: up },
  { command: 'CD', handler: cd },
  { command: 'LS', handler: ls },
  { command: 'OS', handler: os },
  { command: 'HASH', handler: hash },
  { command: 'COMPRESS', handler: compress },
  { command: 'DECOMPRESS', handler: decompress },
  { command: 'CAT', handler: cat },
  { command: 'ADD', handler: add },
];

export const commandHandler = async (input) => {
  const userInput = input.trim().toString().replace(EOL, '');
  const [userCommand, ...args] = userInput.split(' ');

  const command = userCommand.toUpperCase();
  utils.writeMessage(`command is ${command}, args is ["${args.join('", "')}"]`);

  const filteredHandler = FileManagerHandlers.filter(
    (handler) => handler.command === command
  );

  if (filteredHandler.length) {
    const handler = filteredHandler[0].handler;
    try {
      await handler(...args);
    } catch (error) {
      const message = invalidInput[error.message];

      if (message) {
        utils.writeInvalidInputMessage(message);
      } else {
        utils.writeFailedMessage(error);
      }
    }
  } else {
    utils.writeInvalidInputMessage(invalidInput.unknownCommand);
  }

  utils.writeInviteMessage();
};
