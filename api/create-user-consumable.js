const dynamoDB = require('../utils/dynamo').dynamoDB
const uuid4 = require('uuid').v4

const handler = (event, context, cb) => {
  const postData = JSON.parse(event.body)

  getConsumableType(postData.typeName)
  .then(consumableType => putUserConsumableToDB(buildUserConsumable(consumableType, postData.itemsCount)))
  .then(res => {
    cb(null, {
      statusCode: 201,
      body: JSON.stringify({message: 'success'})
    })
  })
}

const getConsumableType = async consumableTypeName => {
  const data = await dynamoDB.get({
    TableName: 'ConsumableType',
    Key: {
      name: consumableTypeName
    }
  }).promise()
  return data.Item
}

const buildUserConsumable = (consumableType, itemsCount) => ({
  uuid: uuid4(),
  typeName: consumableType.name,
  expireTimestamp: Math.floor(new Date().getTime() / 1000) + consumableType.averageConsumSeconds * itemsCount
})

const putUserConsumableToDB = async data => {
  await dynamoDB.put({
    TableName: 'UserConsumable',
    Item: data
  }).promise()
  return data
}

module.exports = {handler}
