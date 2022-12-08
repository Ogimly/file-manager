import { EOL } from 'os';

import { stdin as input, stdout as output, stderr as errOutput } from 'process';

export const interfaceIO = { input, output };

export const writeMessage = (message) => {
  output.write(`${message}${EOL}`);
};

export const writeInviteMessage = () => {
  output.write(`${EOL}You are currently in ${process.cwd()}${EOL}> `);
};

export const writeFailedMessage = (error) => {
  errOutput.write(`Operation failed: ${error}${EOL}`);
};

export const writeInvalidInputMessage = (error) => {
  errOutput.write(`Invalid input: ${error}${EOL}`);
};
