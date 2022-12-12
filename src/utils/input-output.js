import { createWriteStream } from 'fs';
import { EOL } from 'os';
import { stdin as input, stdout as output, stderr as errOutput } from 'process';
import { LOG_FILE_NAME } from '../const.js';
import { getCurrentDate, getCurrentTime } from './date-time.js';

export const interfaceIO = { input, output };

export const writeMessage = (message) => {
  const outputMessage = `${message}${EOL}`;
  output.write(outputMessage);
  writeLog(outputMessage);
};

export const writeInviteMessage = () => {
  const outputMessage = `${EOL}You are currently in ${process.cwd()}${EOL}> `;
  output.write(outputMessage);
  writeLog(outputMessage);
};

export const writeFailedMessage = (error) => {
  const outputMessage = `Operation failed: ${error}${EOL}`;
  errOutput.write(outputMessage);
  writeLog(outputMessage);
};

export const writeInvalidInputMessage = (error) => {
  const outputMessage = `Invalid input: ${error}${EOL}Type "help" to get command list${EOL}`;
  errOutput.write(outputMessage);
  writeLog(outputMessage);
};

export const writeTable = (table) => {
  console.table(table);
  writeLog(JSON.stringify(table).replaceAll('},{', `}${EOL}{`));
};

export const writeLog = (message) => {
  logStream.write(`${getCurrentTime()}: ${message}${EOL}`);
};

const logStream = createWriteStream(LOG_FILE_NAME, { flags: 'a' });
logStream.write(`------------------------------------------------------${EOL}`);
logStream.write(`---- START ${getCurrentDate()}: ${getCurrentTime()}${EOL}`);
logStream.write(`------------------------------------------------------${EOL}`);
