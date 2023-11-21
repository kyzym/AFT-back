import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import chalk from 'chalk';
import swaggerDoc from 'swagger-ui-express';
import mongoose from 'mongoose';
import { swaggerControllers } from './controllers/index.js';
import { error } from './middlewares/errors.middleware.js';
import { RouteNotFoundError } from './helpers/errors.js';
import dishesRoutes from './routes/dishes.js';
import ingredientsRoutes from './routes/ingredients.js';

dotenv.config();

const app = express();

const { PORT = 3000 } = process.env;

app.use(morgan('short'));

app.use(cors());

app.use(express.json());

app.use('/docs', swaggerDoc.serve, swaggerDoc.setup(swaggerControllers));

app.use('/api/dishes', dishesRoutes);
app.use('/api/ingredients', ingredientsRoutes);

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
