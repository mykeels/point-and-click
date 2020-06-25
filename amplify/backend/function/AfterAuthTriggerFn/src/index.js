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
const region = process.env.REGION;
const loginEventTableName = process.env.API_POINTANDCLICK_LOGINEVENTTABLE_NAME;

AWS.config.update({region: region});

const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = function(event, context) {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const userId = (event.callerContext || {}).clientId;

  if (!userId) {
    return context.done(new Error("No [userId] found"));
  }

  db.putItem({
    TableName: loginEventTableName,
    Item: {
      user_id: {
        S: userId
      }
    }
  })
  .promise()
  .then(value => {
    context.done(null, value);
  }).catch(error => {
    context.done(error);
  });
};

