import { createReadStream, createWriteStream } from 'fs';
import { pipeline, finished } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { resolve as pathResolve } from 'path';

import * as files from '../utils/files.js';
import { writeMessage } from '../utils/input-output.js';
import { errorCode } from '../const.js';

const getPaths = async (pathSrc, pathDest, handlerExt) => {
  let result = await files.checkAsFile(pathSrc);
  if (result.error) return { error: errorCode.notFileSrc };

  const pathToFileSrc = result.pathToFile;

  let pathToFileDest;

  if (pathDest) {
    result = await files.checkAsDirectory(pathDest);
    if (result.error) return { error: errorCode.notDirectoryDest };

    const fileName = files.getFileName(pathToFileSrc);

    const newFileName = handlerExt(fileName, '.br');

    pathToFileDest = pathResolve(result.pathToDirectory, newFileName);
  } else {
    pathToFileDest = handlerExt(pathToFileSrc, '.br');
  }

  return { pathToFileSrc, pathToFileDest };
};

const handlerZlib = (pathSrc, pathDest, zlib, handlerExt, isCompress) =>
  new Promise(async (resolve, reject) => {
    const result = await getPaths(pathSrc, pathDest, handlerExt);
    if (result.error) {
      reject(new Error(result.error));
      return;
    }

    const { pathToFileSrc, pathToFileDest } = result;

    const readStream = createReadStream(pathToFileSrc);
    const writeStream = createWriteStream(pathToFileDest);

    pipeline(readStream, zlib, writeStream, (error) => {
      if (error) {
        reject(error);
      }
    });

    finished(readStream, (error) => {
      if (error) {
        reject(error);
      } else {
        writeMessage(
          `"${pathToFileSrc}" ${isCompress ? '' : 'de'}compressed to "${pathToFileDest}"`
        );
        resolve();
      }
    });
  });

export const compress = (pathSrc, pathDest) =>
  handlerZlib(pathSrc, pathDest, createBrotliCompress(), files.addExtension, true);

export const decompress = (pathSrc, pathDest) =>
  handlerZlib(pathSrc, pathDest, createBrotliDecompress(), files.removeExtension, false);
