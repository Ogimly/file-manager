import { up, cd, ls } from './handlers/navigation.js';
import { os } from './handlers/operating-system.js';
import { hash } from './handlers/hash-calculation.js';
import { compress, decompress } from './handlers/compression.js';
import { cat, add, rn, cp, rm, rv } from './handlers/basic-operations.js';

import { writeMessage, writeInviteMessage } from './utils/input-output.js';
import { errorHandler } from './utils/error-handler.js';
import { errorCode } from './const.js';
import { splitCommand } from './utils/strings.js';

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
  try {
    const [userCommand, ...args] = splitCommand(input);

    if (!userCommand) throw new Error(errorCode.noCommand);

    const command = userCommand.toUpperCase();
    writeMessage(`command is ${command}, args is ["${args.join('", "')}"]`);

    const foundHandler = FileManagerHandlers.find(
      (handler) => handler.command === command
    );

    if (!foundHandler) throw new Error(errorCode.unknownCommand);

    await foundHandler.handler(...args);
  } catch (error) {
    errorHandler(error);
  }

  writeInviteMessage();
};
