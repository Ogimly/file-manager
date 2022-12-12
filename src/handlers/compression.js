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

  // try to understand what the user wants:
  if (pathDest) {
    result = await files.checkAsFile(pathDest);
    if (result.error) {
      result = await files.checkAsDirectory(pathDest);
      if (result.error) {
        // destination is new file
        pathToFileDest = pathResolve(pathDest);

        result = await files.checkAsDirectory(files.getDir(pathToFileDest));
        // destination is not existing directory
        if (result.error) return { error: errorCode.notDirectoryDest };
      } else {
        // destination is existing directory
        const fileName = files.getFileName(pathToFileSrc);

        const newFileName = handlerExt(fileName, '.br');

        pathToFileDest = pathResolve(result.pathToDirectory, newFileName);
      }
    } else {
      // destination is existing file
      pathToFileDest = result.pathToFile;
    }
  } else {
    // destination is empty
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
