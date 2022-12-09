import { stat } from 'fs/promises';
import { basename, resolve } from 'path';

const checkPath = async (path, checkName) => {
  try {
    const statInfo = await stat(path);

    const check = statInfo[checkName].bind(statInfo);

    return check();
  } catch (error) {
    return false;
  }
};

export const isDirectory = async (path) => {
  return checkPath(path, 'isDirectory');
};

export const isFile = async (path) => {
  return checkPath(path, 'isFile');
};

export const getFileName = (path) => {
  return basename(path);
};

export const addExtension = (path, ext) => {
  return path + ext;
};

export const removeExtension = (path, ext) => {
  return path.slice(0, path.lastIndexOf(ext));
};
