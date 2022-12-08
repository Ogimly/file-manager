import { up, cd, ls } from './handlers/navigation.js';
import { os } from './handlers/operating-system.js';
import { hash } from './handlers/hash-calculation.js';
import { compress, decompress } from './handlers/compression.js';
import { cat, add, rn, cp, rm, rv } from './handlers/basic-operations.js';
import { EOL } from 'os';

import * as IO from './utils/input-output.js';
import { invalidInput } from './const.js';

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
  { command: 'RN', handler: rn },
  { command: 'CP', handler: cp },
  { command: 'RM', handler: rm },
  { command: 'RV', handler: rv },
];

export const commandHandler = async (input) => {
  const userInput = input.trim().toString().replace(EOL, '');
  const [userCommand, ...args] = userInput.split(' ');

  const command = userCommand.toUpperCase();
  IO.writeMessage(`command is ${command}, args is ["${args.join('", "')}"]`);

  const foundHandler = FileManagerHandlers.find((handler) => handler.command === command);

  if (foundHandler) {
    const handler = foundHandler.handler;
    try {
      await handler(...args);
    } catch (error) {
      const message = invalidInput[error.message];

      if (message) {
        IO.writeInvalidInputMessage(message);
      } else {
        IO.writeFailedMessage(error);
      }
    }
  } else {
    IO.writeInvalidInputMessage(invalidInput.unknownCommand);
  }

  IO.writeInviteMessage();
};
