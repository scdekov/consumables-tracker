const dynamoDB = require('../utils/dynamo').dynamoDB

const handler = (event, context, cb) => {
  getConsumableTypes()
  .then(res => {
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(res, null, 2)
    })
  })
}

var getConsumableTypes = async () => {
  const res = await dynamoDB.scan({
    TableName: 'ConsumableType',
  }).promise()
  return res['Items']
}

module.exports = {handler}
