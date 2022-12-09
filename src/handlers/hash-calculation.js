import { createReadStream } from 'fs';
import { finished } from 'stream';
import { createHash } from 'crypto';

import { checkAsFile } from '../utils/files.js';
import { writeMessage } from '../utils/input-output.js';

export const hash = async (path) =>
  new Promise(async (resolve, reject) => {
    const result = await checkAsFile(path);
    if (result.error) {
      reject(new Error(result.error));
      return;
    }

    const readStream = createReadStream(result.pathToFile);
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
