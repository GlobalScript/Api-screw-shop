import express from 'express'
import 'dotenv/config';
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import {router} from './app/routes/api.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({credentials: true,
  origin: [process.env.CORS_DOMAIN_0, process.env.CORS_DOMAIN_1]
}));

  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

  app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log('Server work');
  });
  
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use(router);
  app.use(express.static(path.join(__dirname, 'uploads')));
  
  app.use((req, res) => {
    res.status(404).send({error: "not found"});
  });






