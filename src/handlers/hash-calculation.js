import { createReadStream } from 'fs';
import { finished } from 'stream';
import { createHash } from 'crypto';
import { resolve as pathResolve } from 'path';

import { errorCode } from '../const.js';
import { isFile } from '../utils/files.js';
import { writeMessage } from '../utils/input-output.js';

export const hash = async (path) =>
  new Promise(async (resolve, reject) => {
    if (!path) {
      reject(new Error(errorCode.noUrl));
      return;
    }

    const pathToFile = pathResolve(path);
    const pathIsFile = await isFile(pathToFile);

    if (!pathIsFile) {
      reject(new Error(errorCode.notFile));
      return;
    }

    const readStream = createReadStream(pathToFile);
    const hash = readStream.pipe(createHash('sha256').setEncoding('hex'));

    hash.on('data', (chunk) => {
      writeMessage(chunk.toString());
    });

    finished(readStream, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
