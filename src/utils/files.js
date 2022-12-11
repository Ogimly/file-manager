import { stat } from 'fs/promises';
import { basename, parse, resolve, extname } from 'path';

import { errorCode } from '../const.js';

const checkPath = async (path, checkName) => {
  try {
    const statInfo = await stat(path);

    const check = statInfo[checkName].bind(statInfo);

    return check();
  } catch (error) {
    return false;
  }
};

export const checkAsDirectory = async (path) => {
  if (!path) return { error: errorCode.noUrl };

  const pathToDirectory = resolve(path);

  const pathIsDirectory = await checkPath(pathToDirectory, 'isDirectory');

  if (!pathIsDirectory) return { error: errorCode.notDirectory };

  return { pathToDirectory };
};

export const checkAsFile = async (path) => {
  if (!path) return { error: errorCode.noUrl };

  const pathToFile = resolve(path);
  const pathIsFile = await checkPath(pathToFile, 'isFile');

  if (!pathIsFile) return { error: errorCode.notFile };

  return { pathToFile };
};

export const getRoot = (path) => {
  return parse(path).root;
};

export const getDir = (path) => {
  return parse(path).dir;
};

export const getFileName = (path) => {
  return basename(path);
};

export const addExtension = (path, ext) => {
  return path + ext;
};

export const removeExtension = (path, fileExt) => {
  const lastIndex = path.lastIndexOf(fileExt);
  if (lastIndex === -1) {
    const ext = extname(path);
    if (ext === '') return path + '.txt';
    return removeExtension(path, ext) + '.txt';
  }

  return path.slice(0, lastIndex);
};
