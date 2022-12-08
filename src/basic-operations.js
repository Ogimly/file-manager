import { createReadStream, createWriteStream } from 'fs';
import { rename } from 'fs/promises';
import { finished, pipeline } from 'stream';
import { join, basename } from 'path';

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

    const writeStream = createWriteStream(join(process.cwd(), fileName));

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

export const cp = async (pathToFile, pathDest) =>
  new Promise((resolve, reject) => {
    if (!pathToFile || !pathDest) {
      reject(new Error(errorCode.noUrl));
    } else {
      const fileName = basename(pathToFile);
      const newPathToFile = join(pathDest, fileName);

      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(newPathToFile);

      pipeline(readStream, writeStream, (error) => {
        if (error) {
          reject(error);
        }
      });

      finished(readStream, (error) => {
        if (error) {
          reject(error);
        } else {
          writeMessage(`"${fileName}" copied to "${pathDest}"`);
          resolve();
        }
      });

      finished(writeStream, (error) => {
        if (error) {
          reject(error);
        }
      });
    }
  });
