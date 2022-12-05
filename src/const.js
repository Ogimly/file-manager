import { stdin as input, stdout as output, stderr as errOutput } from 'process';
export { input, output, errOutput };

export const errorCode = {
  noUser: 'noUser',
  noUrl: 'noUrl',
};

export const invalidInput = {
  noUser: 'please enter your username (npm run start -- --username=your_username)',
  unknownCommand: 'unknown command',
  noUrl: 'path url needed',
};
