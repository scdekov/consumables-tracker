const dynamoDB = require('../utils/dynamo').dynamoDB
const AWS = require('aws-sdk');

const SNS = new AWS.SNS()

const handler = () => {
  console.log('start')
  getUserConsumables()
  .then(userConsumables => {
    const consumablesExpiringToday = filterTodayExpiring(userConsumables)
    if (!consumablesExpiringToday.length) {
      console.log('no notifications')
      return
    }
    console.log(consumablesExpiringToday)

    SNS.publish({
      Message: `Expiring consumables ${JSON.stringify(consumablesExpiringToday)}`,
      TopicArn: 'arn:aws:sns:us-east-1:290538282417:ExpiringConsumables'
    }, function () { console.log (arguments) })
  })
}

const filterTodayExpiring = consumables => {
  let today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayStartTimestamp = Math.floor(today.getTime() / 1000)
  return consumables.filter(consumable => consumable.expireTimestamp > dayStartTimestamp)
}

const getUserConsumables = async () => {
  const res = await dynamoDB.scan({
    TableName: 'UserConsumable',
  }).promise()
  return res['Items']
}

module.exports = {handler}
