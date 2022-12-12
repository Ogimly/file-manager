export const LOG_FILE_NAME = 'log.txt';

export const errorCode = {
  noCommand: 'noCommand',
  noUser: 'noUser',
  unknownCommand: 'unknownCommand',
  noUrl: 'noUrl',
  notDirectory: 'notDirectory',
  notDirectoryDest: 'notDirectoryDest',
  notFile: 'notFile',
  notFileSrc: 'notFileSrc',
  noFileName: 'noFileName',
  noParameter: 'noParameter',
  unknownParameter: 'unknownParameter',
};

export const invalidInput = {
  noCommand: 'command name needed',
  noUser: 'please enter your username (npm run start -- --username=your_username)',
  unknownCommand: 'unknown command',
  noUrl: 'path url needed',
  notDirectory: 'path is not directory',
  notDirectoryDest: 'path to destination is not directory',
  notFile: 'path is not file',
  notFileSrc: 'path to source is not file',
  noFileName: 'file name needed',
  noParameter: 'os parameter needed',
  unknownParameter: 'unknown os parameter',
};

export const helpTable = [
  {
    command: 'npm start -- --username=your_username',
    description: 'Start the application',
  },
  {
    command: '.exit or Ctrl+C',
    description: 'Exit the application',
  },
  {
    command: 'up',
    description: 'Go upper from current directory',
  },
  {
    command: 'cd path_to_directory',
    description: 'Go to dedicated folder from current directory',
  },
  {
    command: 'ls',
    description: 'List all files and folder in current directory',
  },
  {
    command: 'cat path_to_file',
    description: `Read file and print it's content in console`,
  },
  {
    command: 'add new_file_name',
    description: 'Create empty file in current working directory',
  },
  {
    command: 'rn path_to_file new_filename',
    description: 'Rename file',
  },
  {
    command: 'cp path_to_file path_to_new_directory',
    description: 'Copy file',
  },
  {
    command: 'mv path_to_file path_to_new_directory',
    description: 'Move file',
  },
  {
    command: 'rm path_to_file',
    description: 'Delete file',
  },

  {
    command: 'os --EOL',
    description: 'Get EOL (default system End-Of-Line) and print it to console',
  },
  {
    command: 'os --cpus',
    description: 'Get host machine CPUs info and print it to console',
  },
  {
    command: 'os --homedir',
    description: 'Get home directory and print it to console',
  },
  {
    command: 'os --username',
    description: 'Get current system user name and print it to console',
  },
  {
    command: 'os --architecture',
    description: 'Get CPU architecture and print it to console',
  },
  {
    command: 'hash path_to_file',
    description: 'Calculate hash for file and print it into console',
  },
  {
    command: 'compress path_to_file path_to_destination',
    description: 'Compress file (using Brotli algorithm)',
  },
  {
    command: 'decompress path_to_file path_to_destination',
    description: 'Decompress file (using Brotli algorithm)',
  },
];
