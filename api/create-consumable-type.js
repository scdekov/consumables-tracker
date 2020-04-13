import {dynamoDb} from './util'

export const handler = (event, context, cb) => {
  putConsumableTypeToDB(JSON.parse(event.body))
  .then(res => {
    cb(null, {
      statusCode: 201,
      body: JSON.stringify({message: 'success'})
    })
  })
}

var putConsumableTypeToDB = async consumableType => {
  await dynamoDb.put({
    TableName: 'ConsumableType',
    Item: consumableType
  }).promise()
  return consumableType
}
