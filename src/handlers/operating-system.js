import { EOL, cpus, homedir, userInfo, arch } from 'os';

import { errorCode } from '../const.js';
import { writeMessage } from '../utils/input-output.js';

const parameterData = [
  {
    parameter: 'EOL',
    getData: () => ({
      message: `EOL (default system End-Of-Line): ${JSON.stringify(EOL)}`,
    }),
  },
  {
    parameter: 'CPUS',
    getData: () => {
      const CPUArray = cpus().map(({ model, speed }) => ({
        Model: model,
        Speed: `${speed / (arch() === 'arm64' ? 10 : 1000)}GHz`,
      }));

      return {
        message: `Overall amount of CPUs: ${CPUArray.length}`,
        table: CPUArray,
      };
    },
  },
  { parameter: 'HOMEDIR', getData: () => ({ message: `Home directory: ${homedir()}` }) },
  {
    parameter: 'USERNAME',
    getData: () => ({ message: `Current system user name: ${userInfo().username}` }),
  },
  {
    parameter: 'ARCHITECTURE',
    getData: () => ({ message: `CPU architecture: ${arch()}` }),
  },
];

export const os = (parameter) => {
  if (!parameter) throw new Error(errorCode.noParameter);

  if (parameter.slice(0, 2) !== '--') throw new Error(errorCode.unknownParameter);

  const slicedParameter = parameter.slice(2).toUpperCase();

  const foundData = parameterData.find((data) => data.parameter === slicedParameter);

  if (!foundData) throw new Error(errorCode.unknownParameter);

  const { message, table } = foundData.getData();

  writeMessage(message);
  if (table) console.table(table);
};
