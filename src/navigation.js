import { parse } from 'path';

import { errorCode, invalidInput } from './const.js';
import { writeFailedMessage, writeInvalidInputMessage } from './utils.js';

export const up = () => {
  const cwd = process.cwd();
  if (parse(cwd).root !== cwd) process.chdir('../');
};

export const cd = (path) => {
  try {
    if (!path) throw new Error(errorCode.noUrl);

    process.chdir(path);
  } catch (error) {
    switch (error.message) {
      case errorCode.noUrl:
        writeInvalidInputMessage(invalidInput.noUrl);
        break;

      default:
        writeFailedMessage(error);
        break;
    }
  }
};
