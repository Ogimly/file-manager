import { createReadStream, createWriteStream } from 'fs';
import { rename, rm as remove } from 'fs/promises';
import { finished, pipeline } from 'stream';
import { join } from 'path';

import { errorCode } from '../const.js';
import { writeMessage } from '../utils/input-output.js';
import { checkAsDirectory, checkAsFile, getFileName } from '../utils/files.js';

export const cat = (path) =>
  new Promise(async (resolve, reject) => {
    const result = await checkAsFile(path);
    if (result.error) {
      reject(new Error(result.error));
      return;
    }

    const { pathToFile } = result;

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

export const rn = async (path, fileName) => {
  const result = await checkAsFile(path);
  if (result.error) {
    throw new Error(result.error);
  }

  const { pathToFile } = result;

  if (!fileName) throw new Error(errorCode.noFileName);

  const oldName = getFileName(pathToFile);

  await rename(pathToFile, pathToFile.replace(oldName, fileName));

  writeMessage(`"${oldName}" renamed to "${fileName}"`);
};

export const cp = async (path, pathDest) =>
  new Promise(async (resolve, reject) => {
    let result = await checkAsFile(path);
    if (result.error) {
      reject(new Error(errorCode.notFileSrc));
      return;
    }
    const { pathToFile } = result;

    result = await checkAsDirectory(pathDest);
    if (result.error) {
      reject(new Error(errorCode.notDirectoryDest));
      return;
    }
    const { pathToDirectory } = result;

    const fileName = getFileName(pathToFile);
    const newPathToFile = join(pathToDirectory, fileName);

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
  });

export const rm = async (path) => {
  const result = await checkAsFile(path);
  if (result.error) throw new Error(result.error);

  const { pathToFile } = result;

  const fileName = getFileName(pathToFile);

  await remove(pathToFile);

  writeMessage(`"${fileName}" removed!`);
};

export const rv = async (pathToFile, pathDest) => {
  try {
    await cp(pathToFile, pathDest);
    await rm(pathToFile);
  } catch (error) {
    throw error;
  }
};
