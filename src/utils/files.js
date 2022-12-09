import { stat } from 'fs/promises';

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
