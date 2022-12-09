import { EOL } from 'os';

export const splitCommand = (input) => {
  let userInput = input.toString().trim().replace(EOL, '');

  const resArray = [];

  let separator = ' ';

  while (userInput) {
    let separatorIndex = userInput.indexOf(separator) + 1;
    if (separatorIndex === 0) {
      resArray.push(userInput.replace(separator, ''));
      return resArray;
    }

    let item = userInput.slice(0, separatorIndex).replace(separator, '');
    if (item) resArray.push(item);
    userInput = userInput.slice(separatorIndex).trim();

    separator = ' ';

    if (userInput.slice(0, 1) === '"') {
      separator = '"';
      userInput = userInput.slice(1);
    }
    if (userInput.slice(0, 1) === "'") {
      separator = "'";
      userInput = userInput.slice(1);
    }
  }
  return resArray;
};
