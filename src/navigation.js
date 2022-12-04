import { chdir, cwd, stdout as output, stderr as errOutput } from 'process';
import { parse } from 'path';
import { EOL } from 'os';

import { errorCode } from './const.js';

export const up = () => {
  if (parse(cwd()).root !== cwd()) chdir('../');
};

export const cd = (path) => {
  try {
    if (!path) throw new Error(errorCode.noUrl);

    chdir(path);
  } catch (error) {
    switch (error.message) {
      case errorCode.noUrl:
        errOutput.write(`Invalid input: path url needed!${EOL}`);
        break;

      default:
        errOutput.write(`Operation failed: ${error}${EOL}`);
        break;
    }
  }
};
