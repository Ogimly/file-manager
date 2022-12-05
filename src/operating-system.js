import { EOL, cpus as osCPUs, homedir as osHomedir, userInfo, arch } from 'os';

import { writeMessage, writeFailedMessage } from './utils.js';

export const eol = () => {
  try {
    writeMessage(`EOL (default system End-Of-Line): ${JSON.stringify(EOL)}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const cpus = () => {
  try {
    const CPUArray = osCPUs().map(({ model, speed }) => ({
      Model: model,
      Speed: `${speed / 1000}GHz`,
    }));
    writeMessage(`Overall amount of CPUs: ${CPUArray.length}`);
    console.table(CPUArray);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const homedir = () => {
  try {
    writeMessage(`Home directory: ${osHomedir()}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const username = () => {
  try {
    writeMessage(`Current system user name: ${userInfo().username}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const architecture = () => {
  try {
    writeMessage(`CPU architecture: ${arch()}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};
