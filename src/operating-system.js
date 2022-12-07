import { EOL, cpus, homedir, userInfo, arch } from 'os';

import { errorCode } from './const.js';
import { writeMessage } from './utils.js';

const CPUArray = () =>
  cpus().map(({ model, speed }) => ({
    Model: model,
    Speed: `${speed / 1000}GHz`,
  }));

const parameterData = [
  {
    parameter: 'EOL',
    data: { message: `EOL (default system End-Of-Line): ${JSON.stringify(EOL)}` },
  },
  {
    parameter: 'CPUS',
    data: {
      message: `Overall amount of CPUs: ${CPUArray().length}`,
      table: CPUArray(),
    },
  },
  { parameter: 'HOMEDIR', data: { message: `Home directory: ${homedir()}` } },
  {
    parameter: 'USERNAME',
    data: { message: `Current system user name: ${userInfo().username}` },
  },
  { parameter: 'ARCHITECTURE', data: { message: `CPU architecture: ${arch()}` } },
];

export const os = (parameter) => {
  if (!parameter) throw new Error(errorCode.noParameter);

  if (parameter.slice(0, 2) !== '--') throw new Error(errorCode.unknownParameter);

  const slicedParameter = parameter.slice(2).toUpperCase();

  const filteredData = parameterData.filter((data) => data.parameter === slicedParameter);

  if (filteredData.length === 0) throw new Error(errorCode.unknownParameter);

  const { message, table } = filteredData[0].data;

  writeMessage(message);
  if (table) console.table(table);
};
