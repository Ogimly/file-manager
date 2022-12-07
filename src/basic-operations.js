import { createReadStream, createWriteStream } from 'fs';
import { finished } from 'stream';
import path from 'path';

import { errorCode } from './const.js';
import { writeMessage } from './utils.js';

export const cat = (path) =>
  new Promise((resolve, reject) => {
    if (!path) reject(new Error(errorCode.noUrl));

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

export const add = (fileName) =>
  new Promise((resolve, reject) => {
    if (!fileName) reject(new Error(errorCode.noFileName));

    const writeStream = createWriteStream(path.join(process.cwd(), fileName));

    finished(writeStream, (error) => {
      if (error) {
        reject(error);
      } else {
        writeMessage(`"${fileName}" created`);
        resolve();
      }
    });

    writeStream.close();
  });
