const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));
export const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});
