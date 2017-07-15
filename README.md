# create-lambda-express
Creating a Node.js microservice and deploying it on AWS Lambda should be very easy. That is exactly the aim of this repo.

Inspired heavily by create-react-app, create-lambda-express allows you to scaffold out a production-ready microservice that focuses on DX and follows modern practices out of the box.

As the name implies, the code generated is an **Express application** that can be deployed to **AWS Lambda**. Other notable technologies used are **Serverless, Babel and Webpack**.

## Quick start
Run the following command
```
$> yarn create lambda-express hello-lambda
```
This will install create-lambda-express globally and create a lambda service named hello-lambda. After this you are ready to run
```
$> cd hello-lambda
$> yarn start
```
After which the server will be started, and your browser will open at http://localhost:3000 and greet you with
```json
{"message":"express server is running succesfully"}
```

