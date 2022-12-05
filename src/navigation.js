import { parse, sep } from 'path';
import { readdir } from 'fs/promises';

import { errorCode, invalidInput } from './const.js';
import { writeFailedMessage, writeInvalidInputMessage } from './utils.js';

export const up = () => {
  const cwd = process.cwd();
  if (parse(cwd).root !== cwd) process.chdir('../');
};

export const cd = (path) => {
  try {
    if (!path) throw new Error(errorCode.noUrl);

    if (path.slice(-1) !== sep) path += sep;

    process.chdir(path);
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

const sortBy = (a, b, key) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }
  return 0;
};

export const ls = async () => {
  try {
    const fullName = process.cwd();
    console.log(fullName);

    const files = (await readdir(fullName, { withFileTypes: true }))
      .map((file) => ({
        Name: file.name,
        Type: file.isFile() ? 'file' : 'directory',
      }))
      .sort((a, b) => (a.Type === b.Type ? sortBy(a, b, 'Name') : sortBy(a, b, 'Type')));

    console.table(files);
  } catch (error) {
    writeFailedMessage(error);
  }
};
