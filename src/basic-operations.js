import { createReadStream, createWriteStream } from 'fs';
import { rename } from 'fs/promises';
import { finished } from 'stream';
import path, { basename } from 'path';

import { errorCode } from './const.js';
import { writeMessage } from './utils.js';

export const cat = (pathToFile) =>
  new Promise((resolve, reject) => {
    if (!pathToFile) reject(new Error(errorCode.noUrl));

    const readStream = createReadStream(pathToFile, 'utf-8');
    readStream.on('data', (chunk) => {
      writeMessage(chunk.toString());
    });

    finished(readStream, (error) => {
      if (error) {
        reject(error);
      } else {
        writeMessage(`"${pathToFile}" read`);
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

export const rn = async (pathToFile, fileName) => {
  if (!pathToFile) throw new Error(errorCode.noUrl);
  if (!fileName) throw new Error(errorCode.noFileName);

  const oldName = basename(pathToFile);

  await rename(pathToFile, pathToFile.replace(oldName, fileName));

  writeMessage(`"${oldName}" renamed to "${fileName}"`);
};
