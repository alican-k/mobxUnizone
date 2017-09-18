import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyAWQf822aZgKuz8lI5AN67OjRAABC8Cjhk",
	authDomain: "unizone-95e26.firebaseapp.com",
	databaseURL: "https://unizone-95e26.firebaseio.com",
	projectId: "unizone-95e26",
	storageBucket: "unizone-95e26.appspot.com",
	messagingSenderId: "160926205040"
}
export default firebase.initializeApp(firebaseConfig)
