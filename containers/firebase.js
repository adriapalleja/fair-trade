import firebase from 'firebase';
import 'firebase/database';

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

export const postProduct = (id,product,quantity,price,location) => {
  if (product !== '' && quantity > 0 && price > 0 && location !== '') {
    db.ref('posts/'+id).set({id: id, product: product, quantity: quantity, 
      price: price, location: location});
    return true;
  } else {
    return false;
  }
}
  