import { createReadStream } from 'fs';
import { finished } from 'stream';

import { errorCode } from './const.js';
import { writeMessage } from './utils.js';

export const cat = (path) => {
  return new Promise((resolve, reject) => {
    if (!path) reject(errorCode.noUrl);

    const readStream = createReadStream(path, 'utf-8');
    readStream.on('data', (chunk) => {
      writeMessage(chunk.toString());
    });

    finished(readStream, (error) => {
      if (error) {
        reject(error);
      } else {
        writeMessage(`"${path}" read`);
        resolve();
      }
    });
  });
};
