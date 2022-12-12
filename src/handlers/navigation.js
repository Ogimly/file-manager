import { readdir } from 'fs/promises';

import { helpTable } from '../const.js';
import { getRoot, checkAsDirectory } from '../utils/files.js';

export const up = () => {
  const cwd = process.cwd();
  if (getRoot(cwd) !== cwd) process.chdir('../');
};

export const cd = async (path) => {
  const result = await checkAsDirectory(path);
  if (result.error) {
    throw new Error(result.error);
  }

  process.chdir(result.pathToDirectory);
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

export const help = () => {
  console.table(helpTable);
};
