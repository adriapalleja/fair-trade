import firebase from 'firebase';
import 'firebase/database';
import axios from 'axios';
const uuidv4 = require('uuid/v4');

const APP_ID = 'd893796f899f3899e6b9878cc2cd1e3327b26111967a6c92b62da9df52194989';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXuy-OoNPmJ0IwihwmnkPLp8dcqHaWrh8",
  authDomain: "fairprice-32f08.firebaseapp.com",
  databaseURL: "https://fairprice-32f08.firebaseio.com",
  projectId: "fairprice-32f08",
  storageBucket: "fairprice-32f08.appspot.com",
  messagingSenderId: "176853120503"
};
firebase.initializeApp(config);

export const db = firebase.database();
export const postsRef = db.ref('posts');
export const usersRef = db.ref('users');

export const postProduct = (user_id, product,quantity,price,location) => {
  if (product !== '' && quantity > 0 && price > 0 && location !== '') {
    const id = uuidv4();
    axios.get('https://api.unsplash.com/search/photos/?query='+product+'&client_id=' + APP_ID)
		.then(data => {
      let img = data.data.results[0].urls.small;
      db.ref('posts/'+id).set({id: id, product: product, quantity: quantity, 
        price: price, location: location, poster_id: user_id, img: img});
        return true;
		}).catch(err => {
      console.log('Error happened during fetching!', err);
      return false;
		}); 
  } else {
    return false;
  }
}  

export const editProduct = (post) => {
  if (post.product !== '' && post.quantity > 0 && post.price > 0 && post.location !== '') {
    axios.get('https://api.unsplash.com/search/photos/?query='+post.product+'&client_id=' + APP_ID)
		.then(data => {
      post.img = data.data.results[0].urls.small;
      db.ref('posts/'+post.id).set(post);
      return true;
		}).catch(err => {
      console.log('Error happened during fetching!', err);
      return false;
		}); 
  } else return false;
}

export const editProfile = (user) => {
  if (user.full_name !== '' && user.nif_number !== '' && user.phone_number !== '') {
    db.ref('users/'+user.id).set(user);
    return true;
  } else return false;
}

export const createUser = (user) => {
  if (user.password === user.double_pass && user.username && user.full_name && user.phone_number) {
    user.id = uuidv4();
    delete user.double_pass;
    db.ref('users/'+user.id).set(user);
    return true;
  } else return false;
}

export function signInUser (username, password) {
  return new Promise(function(resolve,reject) {
    db.ref('/users').once('value').then(function(snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childObject = childSnapshot.val();
        if(childObject.username === username && childObject.password === password) {
          resolve({result:true,id:childObject.id});
        }
      });
      reject({result:false});
    });
  });
}