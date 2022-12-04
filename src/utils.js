import path, { dirname } from 'path';
import { cwd, stdout } from 'process';
import { EOL } from 'os';

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

export const writeInviteMessage = () => {
  stdout.write(`${EOL}You are currently in ${cwd()}${EOL}> `);
};
