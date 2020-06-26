/* Amplify Params - DO NOT EDIT
	API_POINTANDCLICK_GRAPHQLAPIENDPOINTOUTPUT
	API_POINTANDCLICK_GRAPHQLAPIIDOUTPUT
	API_POINTANDCLICK_LOGINEVENTTABLE_ARN
	API_POINTANDCLICK_LOGINEVENTTABLE_NAME
	AUTH_POINTANDCLICKEC9C3E40_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const region = process.env.REGION;
const loginEventTableName = process.env.API_POINTANDCLICK_LOGINEVENTTABLE_NAME;

AWS.config.update({region: region});

const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = function(event, context) {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const userId = ((event.request || {}).userAttributes || {}).sub;

  if (userId) {
    db.putItem({
      TableName: loginEventTableName,
      Item: {
        id: {
          S: uuid()
        },
        type: {
          S: "LoginEvent"
        },
        user_id: {
          S: userId
        },
        createdAt: {
          S: new Date().toISOString()
        },
        updatedAt: {
          S: new Date().toISOString()
        }
      },
      ConditionExpression: 'attribute_not_exists(id)'
    })
    .promise()
    .then(value => {
      context.done(null, { ...event, response: value });
    }).catch(error => {
      context.done(error);
    });
  }
};

