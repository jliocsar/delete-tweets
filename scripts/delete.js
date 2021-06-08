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

const ENDPOINTS = {
  GET: 'statuses/user_timeline',
  DELETE: 'statuses/destroy/:id',
}

const deleteTweet = async ({ id_str: id }) => {
  console.log('Deleting tweet', id)

  await twit.post(ENDPOINTS.DELETE, { id })

  console.log('Deleted tweet', id)
}

;(async () => {
  const { data: tweets } = await twit.get(ENDPOINTS.GET, {
    screen_name: SCREEN_NAME,
    count: Number(DELETE_COUNT),
  })

  if (!tweets.length) {
    console.log('No tweets found 😕')
  }

  await Promise.all(tweets.map(deleteTweet))
})()
