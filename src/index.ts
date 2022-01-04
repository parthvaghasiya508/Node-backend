import 'reflect-metadata';
// import { createConnection } from 'typeorm';
import { connection } from './connection';
import { Application } from './app';
import * as dotenv from 'dotenv';

dotenv.config();

connection.then(async () => {
  const application: Application = new Application();
  application.startServer();
}).catch((e)=> console.log("connection error:",e.message));
