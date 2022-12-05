import path, { dirname } from 'path';
import { EOL } from 'os';

import { stdin as input, stdout as output, stderr as errOutput } from 'process';
export { input, output, errOutput };

export const IO = { input, output };

export const getFullName = (fileName, ...paths) => {
  const __dirname = dirname(fileName);
  const fullName = path.join(__dirname, ...paths);
  return fullName;
};

export const getUsername = () => {
  let result = process.argv.find((arg) => arg.includes('--username'));
  if (result) result = result.slice(11);
  return result;
};

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
