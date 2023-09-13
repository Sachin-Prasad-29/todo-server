import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { apiRouter } from './routes';
import { NotFoundError, errorHandler } from '@skptickets/common';

const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

// app.get('/', (req, res) => {
//     res.send('HI THere');
// });
app.use(apiRouter);
app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
