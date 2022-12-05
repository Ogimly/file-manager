import { stdin as input, stdout as output, stderr as errOutput } from 'process';
export { input, output, errOutput };

import { up, cd, ls } from './navigation.js';
import { eol, cpus, homedir, username, architecture } from './operating-system.js';

export const FileManagerHandlers = [
  { command: '.EXIT', handler: process.exit },
  { command: 'UP', handler: up },
  { command: 'CD', handler: cd },
  { command: 'LS', handler: ls },
  { command: '--EOL', handler: eol },
  { command: '--CPUS', handler: cpus },
  { command: '--HOMEDIR', handler: homedir },
  { command: '--USERNAME', handler: username },
  { command: '--ARCHITECTURE', handler: architecture },
];

export const errorCode = {
  noUser: 'noUser',
  noUrl: 'noUrl',
};

export const invalidInput = {
  unknownCommand: 'unknown command',
  noUrl: 'path url needed',
};
