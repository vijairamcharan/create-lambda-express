import awsServerlessExpress from 'aws-serverless-express';
import app  from './src/app';

const server = awsServerlessExpress.createServer(app);

export const handler = (event, context) => {
  console.log('event', event);
  return awsServerlessExpress.proxy(server, event, context);
};