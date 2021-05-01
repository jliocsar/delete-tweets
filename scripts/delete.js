require('dotenv/config')
const Twit = require('twit')

const {
  API_KEY,
  API_SECRET_KEY,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  SCREEN_NAME,
  DELETE_COUNT,
} = process.env

const twit = new Twit({
  consumer_key: API_KEY,
  consumer_secret: API_SECRET_KEY,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  strictSSL: true,
})

const deleteTweet = tweet => {
  const params = { id: tweet.id_str }

  twit.post('statuses/destroy/:id', params, (err, deletedTweet, _) => {
    if (err) {
      throw new Error(err)
    }

    console.log(`Deleting tweet ${deletedTweet.id}`)
  })
}

const wipeTwitter = async () => {
  const params = { screen_name: SCREEN_NAME, count: DELETE_COUNT }

  twit.get('statuses/user_timeline', params, (err, tweets, _) => {
    if (err) {
      throw new Error(err)
    }

    tweets.map(deleteTweet)
  })
}

;(async () => {
  await wipeTwitter()
})()
