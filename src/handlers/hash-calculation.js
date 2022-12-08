import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

import { errorCode } from '../const.js';
import { writeMessage } from '../utils/input-output.js';

export const hash = async (path) => {
  if (!path) throw new Error(errorCode.noUrl);

  const content = await readFile(path);

  writeMessage(`Hash: ${createHash('sha256').update(content).digest('hex')}`);
};
