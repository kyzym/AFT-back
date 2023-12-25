import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import chalk from 'chalk';
import swaggerDoc from 'swagger-ui-express';
import mongoose from 'mongoose';
import { swaggerControllers } from './controllers/swagger.js';
import { error } from './middlewares/errors.middleware.js';
import { RouteNotFoundError } from './helpers/errors.js';
import { routes } from '#routes/index.js';

const app = express();

const { PORT = 3000, CLIENT_URL } = process.env;

const corsOptions = {
  origin: `${CLIENT_URL}`,
  credentials: true,
};

app.use(morgan('short'));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs', swaggerDoc.serve, swaggerDoc.setup(swaggerControllers));

routes(app);

// Route not found error
app.use(() => {
  throw new RouteNotFoundError();
});

// Errors handler
app.use(error);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

    const server = app.listen(PORT, () => {
      console.log(
        chalk.cyan.italic(
          `Server is running. Use port: ${server.address().port}`
        )
      );
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
