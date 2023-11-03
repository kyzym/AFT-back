import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const app = express();

const { PORT = 3000 } = process.env;

app.use(morgan("short"));

app.use(cors());

app.use(express.json());

app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    message: "Something went wrong...",
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const { status = 500 } = err;

  res.status(status).json(err.message);
});

app.listen(PORT, () => {
  console.log(chalk.cyan.italic(`Server is running. Use port: ${PORT}`));
});
