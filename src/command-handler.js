import { up, cd, ls } from './navigation.js';
import { eol, cpus, homedir, username, architecture } from './operating-system.js';
import { hash } from './hash-calculation.js';
import { EOL } from 'os';

import { writeMessage, writeInviteMessage, writeInvalidInputMessage } from './utils.js';
import { invalidInput } from './const.js';

const FileManagerHandlers = [
  { command: '.EXIT', handler: process.exit },
  { command: 'UP', handler: up },
  { command: 'CD', handler: cd },
  { command: 'LS', handler: ls },
  { command: '--EOL', handler: eol },
  { command: '--CPUS', handler: cpus },
  { command: '--HOMEDIR', handler: homedir },
  { command: '--USERNAME', handler: username },
  { command: '--ARCHITECTURE', handler: architecture },
  { command: 'HASH', handler: hash },
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
