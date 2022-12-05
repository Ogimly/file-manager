import { stdin as input, stdout as output, stderr as errOutput } from 'process';
export { input, output, errOutput };

import { up, cd } from './navigation.js';

export const FileManagerHandlers = [
  { command: '.EXIT', handler: process.exit },
  { command: 'UP', handler: up },
  { command: 'CD', handler: cd },
];

export const errorCode = {
  noUser: 'noUser',
  noUrl: 'noUrl',
};

export const invalidInput = {
  unknownCommand: 'unknown command',
  noUrl: 'path url needed',
};
