const { Expo } = require('expo-server-sdk');
let expo = new Expo();
const tokens = [];

function registerUser (user) {
  if(Expo.isExpoPushToken(user.token) && !tokens.includes(user.token)) {
    tokens.push({token:user.token,userId:user.userId});
    console.log(user.userId + ' registered!');
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

function userInterested(request) {
  console.log(request);
  tokens.forEach(token => {
    if (token.userId === request.poster) {
      let messages = [];
      messages.push({
        to: token.token,
        sound: 'default',
        body: 'Someone is interested in your ' + request.product,
        data: {withSome: 'data'},
      });
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
  })
} 

module.exports = {registerUser, createPost, userInterested};