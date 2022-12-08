import { createReadStream, createWriteStream } from 'fs';
import { pipeline, finished } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

import { errorCode } from '../const.js';
import { writeMessage } from '../utils/input-output.js';

export const compress = (pathSrc, pathDest) =>
  new Promise((resolve, reject) => {
    if (!pathSrc || !pathDest) {
      reject(new Error(errorCode.noUrl));
    } else {
      const readStream = createReadStream(pathSrc);
      const writeStream = createWriteStream(pathDest);
      const zip = createBrotliCompress();

      pipeline(readStream, zip, writeStream, (error) => {
        if (error) {
          reject(error);
        }
      });

      finished(readStream, (error) => {
        if (error) {
          reject(error);
        } else {
          writeMessage(`"${pathSrc}" compressed to "${pathDest}"`);
          resolve();
        }
      });
    }
  });

export const decompress = (pathSrc, pathDest) =>
  new Promise((resolve, reject) => {
    if (!pathSrc || !pathDest) {
      reject(new Error(errorCode.noUrl));
    } else {
      const readStream = createReadStream(pathSrc);
      const writeStream = createWriteStream(pathDest);
      const unzip = createBrotliDecompress();

      pipeline(readStream, unzip, writeStream, (error) => {
        if (error) {
          reject(error);
        }
      });

      finished(readStream, (error) => {
        if (error) {
          reject(error);
        } else {
          writeMessage(`"${pathSrc}" decompressed to "${pathDest}"`);
          resolve();
        }
      });
    }
  });
