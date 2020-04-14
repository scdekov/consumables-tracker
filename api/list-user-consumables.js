const dynamoDB = require('./util').dynamoDB

const handler = (event, context, cb) => {
  getUserConsumables()
  .then(res => {
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(res, null, 2)
    })
  })
}

var getUserConsumables = async () => {
  const res = await dynamoDB.scan({
    TableName: 'UserConsumable',
  }).promise()
  return res['Items']
}

module.exports = {handler}
