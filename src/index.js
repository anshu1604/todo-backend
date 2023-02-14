import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connectToDB} from './db/connection.js';
import todoRouter from './todo/routes/index.js';

dotenv.config();

const app = express();

app.use(cors());

connectToDB();

app.use(express.json());

app.use(bodyParser.json());

app.use('/api/todo', [todoRouter]);

const PORT = process.env.PORT;

app.listen(8000, () => {
    console.log(`Server connected on PORT ${PORT}`)
})
