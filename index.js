import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import chalk from 'chalk';
import swaggerDoc from 'swagger-ui-express';
import { swaggerControllers } from './controllers/index.js';

dotenv.config();

const app = express();

const { PORT = 3000 } = process.env;

app.use(morgan('short'));

app.use(cors());

app.use(express.json());

app.use('/docs', swaggerDoc.serve, swaggerDoc.setup(swaggerControllers));

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Something went wrong...',
  });
});

app.use((err, _req, res, _next) => {
  const { status = 500 } = err;

  console.error(err);

  res.status(status).json({
    status: 'error',
    message: 'Something went wrong...',
  });
});

app.listen(PORT, () => {
  console.log(chalk.cyan.italic(`Server is running. Use port: ${PORT}`));
});
