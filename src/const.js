import { stdin as input, stdout as output, stderr as errOutput } from 'process';
export { input, output, errOutput };

export const errorCode = {
  noUser: 'noUser',
  noUrl: 'noUrl',
};

export const commandCode = {
  exit: '.EXIT',
  up: 'UP',
  cd: 'CD',
};

export const invalidInput = {
  unknownCommand: 'Invalid input: unknown command',
  noUrl: 'Invalid input: path url needed',
};
