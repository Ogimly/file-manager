import { up, cd, ls } from './navigation.js';
import { os } from './operating-system.js';
import { hash } from './hash-calculation.js';
import { compress, decompress } from './compression.js';
import { EOL } from 'os';

import { writeMessage, writeInviteMessage, writeInvalidInputMessage } from './utils.js';
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
];

export const commandHandler = async (input) => {
  const userInput = input.trim().toString().replace(EOL, '');
  const [userCommand, ...args] = userInput.split(' ');

  const command = userCommand.toUpperCase();
  writeMessage(`command is ${command}, args is ["${args.join('", "')}"]`);

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
