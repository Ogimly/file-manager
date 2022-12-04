import { chdir, cwd } from 'process';
import { parse } from 'path';
import { EOL } from 'os';

import { errorCode, invalidInput } from './const.js';
import { writeFailedMessage, writeInvalidInputMessage } from './utils.js';

export const up = () => {
  if (parse(cwd()).root !== cwd()) chdir('../');
};

export const cd = (path) => {
  try {
    if (!path) throw new Error(errorCode.noUrl);

    chdir(path);
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
