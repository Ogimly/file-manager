import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

import { output, errorCode, invalidInput } from './const.js';
import { writeInvalidInputMessage, writeFailedMessage } from './utils.js';

export const hash = async (path) => {
  try {
    if (!path) throw new Error(errorCode.noUrl);

    const content = await readFile(path);

    output.write(`Hash: ${createHash('sha256').update(content).digest('hex')}`);
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
