import { EOL, cpus as osCPUs, homedir as osHomedir, userInfo, arch } from 'os';

import { output } from './const.js';
import { writeFailedMessage } from './utils.js';

export const eol = () => {
  try {
    output.write(`EOL (default system End-Of-Line): ${JSON.stringify(EOL)}`);
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
    output.write(`Overall amount of CPUs: ${CPUArray.length}${EOL}`);
    console.table(CPUArray);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const homedir = () => {
  try {
    output.write(`Home directory: ${osHomedir()}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const username = () => {
  try {
    output.write(`Current system user name: ${userInfo().username}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};

export const architecture = () => {
  try {
    output.write(`CPU architecture: ${arch()}`);
  } catch (error) {
    writeFailedMessage(error);
  }
};
