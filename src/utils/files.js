import { stat } from 'fs/promises';

export const isDirectory = async (path) => {
  try {
    const statInfo = await stat(path);

    return statInfo.isDirectory();
  } catch (error) {
    return false;
  }
};

export const isFile = async (path) => {
  try {
    const statInfo = await stat(path);

    return statInfo.isFile();
  } catch (error) {
    return false;
  }
};
