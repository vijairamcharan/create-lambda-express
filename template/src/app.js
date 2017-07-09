import "babel-polyfill";
import express from 'express';
import message from './message';

const app = express();

app.get('/', function (req, res) {
  res.status(200).send({message:'express server is running succesfully'})
})

app.get('/message', function (req, res) {
  res.status(200).send(message)
})

app.get('/about', function (req, res) {
  res.status(200).send('{{serviceName}} version 0.9.0')
})

export default app;