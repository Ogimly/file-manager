import { parse, resolve, sep } from 'path';
import { readdir } from 'fs/promises';

import { errorCode } from '../const.js';
import { isDirectory } from '../utils/files.js';

export const up = () => {
  const cwd = process.cwd();
  if (parse(cwd).root !== cwd) process.chdir('../');
};

export const cd = async (path) => {
  if (!path) throw new Error(errorCode.noUrl);

  let pathToDirectory = path;

  if (pathToDirectory.slice(-1) !== sep) pathToDirectory += sep;

  pathToDirectory = resolve(pathToDirectory);

  const pathIsDirectory = await isDirectory(pathToDirectory);

  if (!pathIsDirectory) throw new Error(errorCode.noDirectory);

  process.chdir(pathToDirectory);
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
  const pathToDirectory = process.cwd();

  const files = (await readdir(pathToDirectory, { withFileTypes: true }))
    .map((file) => ({
      Name: file.name,
      Type: file.isFile() ? 'file' : 'directory',
    }))
    .sort((a, b) => (a.Type === b.Type ? sortBy(a, b, 'Name') : sortBy(a, b, 'Type')));

  console.table(files);
};
