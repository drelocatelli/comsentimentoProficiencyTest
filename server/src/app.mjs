import express from 'express';
import dotenv from 'dotenv/config';
import UserController from './controllers/User/UserController.mjs';
import NoticeController from './controllers/Notice/NoticeController.mjs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', UserController);
app.use('/api/notice', NoticeController);

app.listen(process.env.PORT || 3000);