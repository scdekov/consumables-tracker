import {dynamoDb} from './util'

export const handler = (event, context, cb) => {
  getConsumableTypes()
  .then(res => {
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(res)
    })
  })
}

var getConsumableTypes = async () => {
  const res = await dynamoDb.scan({
    TableName: 'ConsumableType',
  }).promise()
  return res['Items']
}
