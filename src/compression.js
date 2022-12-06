import { rm } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline, finished } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

import { errorCode, invalidInput } from './const.js';
import { writeMessage, writeInvalidInputMessage, writeFailedMessage } from './utils.js';

export const compress = (pathSrc, pathDest) => {
  try {
    if (!pathSrc || !pathDest) throw new Error(errorCode.noUrl);

    const readStream = createReadStream(pathSrc);
    const writeStream = createWriteStream(pathDest);
    const zip = createBrotliCompress();

    pipeline(readStream, zip, writeStream, (error) => {
      if (error) {
        writeMessage(`error on compressing: ${error}`);
      }
    });

    finished(readStream, async (error) => {
      if (error) {
        await rm(pathDest, { force: true });
      } else {
        writeMessage(`"${pathSrc}" compressed to "${pathDest}"`);
      }
    });
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

export const decompress = (pathSrc, pathDest) => {
  try {
    if (!pathSrc || !pathDest) throw new Error(errorCode.noUrl);

    const readStream = createReadStream(pathSrc);
    const writeStream = createWriteStream(pathDest);
    const unzip = createBrotliDecompress();

    pipeline(readStream, unzip, writeStream, (error) => {
      if (error) {
        writeMessage(`error on decompressing: ${error}`);
      }
    });

    finished(readStream, async (error) => {
      if (error) {
        await rm(pathDest, { force: true });
      } else {
        writeMessage(`"${pathSrc}" decompressed to "${pathDest}"`);
      }
    });
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
