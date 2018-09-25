const { Expo } = require('expo-server-sdk');
let expo = new Expo();
const tokens = [];

function registerUser (user) {
  if(Expo.isExpoPushToken(user.token.value) && !tokens.includes(user.token.value)) {
    tokens.push(user.token.value);
    console.log(user.userId + 'registered!');
  }
}

function createPost (post) {
  console.log(post);
  let messages = [];
  for(let token of tokens) {
    messages.push({
      to: token,
      sound: 'default',
      body: post.product + ' in ' + post.location + ' available',
      data: {withSome: 'data'},
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

module.exports = {registerUser, createPost};