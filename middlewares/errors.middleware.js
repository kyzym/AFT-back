import chalk from 'chalk';
import { BaseError } from '../helpers/errors.js';

export const error = (error, _req, res, _next) => {
  console.log(chalk.red.italic(`${error.stack}`));

  if (error instanceof BaseError) {
    const { code, success, errors, message } = error;
    const data = { success, message };

    if (errors) data.errors = errors;

    return res.status(code).json(data);
  }

  return res
    .status(500)
    .json({ success: false, message: 'Internal server error' });
};
