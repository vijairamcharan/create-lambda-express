# create-lambda-express
Creating a Node.js microservice and deploying it on AWS Lambda should be very easy. That is exactly the aim of this repo.

Inspired heavily by create-react-app, create-lambda-express allows you to scaffold out a production-ready microservice that focuses on DX and follows modern practices out of the box.

As the name implies, the code generated is an **Express application** that can be deployed to **AWS Lambda**. Other notable technologies used are **Serverless, Babel and Webpack**.

## Quick start
Run the following command
```sh
$> yarn create lambda-express hello-lambda
```
This will install create-lambda-express globally and create a lambda service named hello-lambda. After this you are ready to run
```sh
$> cd hello-lambda
$> yarn start
```
After which the server will be started, and your browser will open at http://localhost:3000 and greet you with
```json
{"message":"express server is running succesfully"}
```

Once you are ready to deploy the service to AWS all you need to do is run
```sh
$> yarn deploy
```

## Why should you use this?
When we started using AWS Lambda in early 2016, the first thing we did was to use the AWS Console to launch the hello world Node.js snippet. When moving code into production we settled on using [serverless](https://serverless.com/). This is after also considering the AWS cli, Claudia, Apex and other options like rolling our own script.

Long story short, Serverless helped out a lot, but still, if you only follow the Serverless or AWS recommendations you will miss out on a lot of stuff that will make your life a lot easier. Create-lambda-express will help out and offer the following advantages out of the box:

* **Decouple your code from AWS Lambda** by writing a normal Express application and serve it with aws-serverless-express which acts as a thin layer to proxy calls from Lambda to Express.
* Use **modern javascript** (ES2015+) with Babel
* Support for **deploying Dev and prod versions** of your service
* Use **babel-preset-env** to serve the most optimal code for Node.js 6.10 which runs on AWS Lambda
* Local DX: Node.js **HMR** (Hot module reloading)
* Local DX: **Start the browser automatically** when running yarn start
* Local DX: **Automatically choose a different port** as the default 3000 when it is taken, or kill the process running there and start anyways
