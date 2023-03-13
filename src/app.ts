import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import cors from 'cors';
import config from "config";
import log from './logger';
import connect from './db/connect';
import routes from './routes';
import userRouter from './controller/user_controller';

// Port + Host
const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// User Route
app.use("/api/user",userRouter);

/// Listen Port + Host
app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`);
    connect();
    routes(app);
});