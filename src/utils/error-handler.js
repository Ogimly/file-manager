import * as IO from './input-output.js';
import { invalidInput } from '../const.js';

export const errorHandler = (error) => {
  const message = invalidInput[error.message];

  if (message) {
    IO.writeInvalidInputMessage(message);
  } else {
    IO.writeFailedMessage(error);
  }
};
