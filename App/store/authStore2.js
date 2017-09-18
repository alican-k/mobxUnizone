import { observable, computed, autorun, action } from 'mobx'
import fir from '../firebase'
import firebase from 'firebase'
import SocialAuth from 'react-native-social-auth';

export default class AuthStore {
	@observable logingIn = false
	@observable uid = 'initializing'
	@observable displayName = null
	@observable photoURL = null
	@observable uniId = null
	@observable about = null

	@computed get isUid() { return this.uid === 'initializing' || this.uid === null ? false : true }
	@computed get isUniId() { return this.uniId === 'initializing' || this.uniId === null ? false : true }
	@computed get showLogin(){ return this.uid === null }

	appStore = null

	constructor(appStore) {
		this.appStore = appStore
		this.watchAuthState()
	}

	watchAuthState(){
		fir.auth().onAuthStateChanged( firUser => {
			if (firUser) {
				this.loggedInUserFound(firUser)
			} else {
				this.loggedInUserNotFound()
			}
	    })
	}

	@action updateUser(props){
		let temp = {
			uid: this.uid, displayName: this.displayName, photoURL: this.photoURL,
			uniId: this.uniId, about: this.about,
			...props
		}
		this.uid = temp.uid
		this.displayName = temp.displayName
		this.photoURL = temp.photoURL
		this.uniId = temp.uniId
		this.about = temp.about

		if (!this.isUid) {
			this.displayName = null
			this.photoURL = null
			this.uniId= null
			this.about = null
		} else if (!this.isUniId) {
			this.about = null
		}
	}
	@action loggedInUserFound(firUser){
		//console.log('firUser:', firUser);
		const {uid, displayName} = firUser
		const photoURL = firUser.providerData && firUser.providerData[0]
			? firUser.providerData[0].photoURL
			: firUser.photoURL

		this.updateUser({uid, displayName, photoURL, uniId: 'initializing'})

		fir.database().ref('/unizoneUsers/' + this.uid).once('value')
		.then( (snapshot) => {
			if (snapshot.val()) {
				this.profileAlreadySetted(
					snapshot.val().uniId, snapshot.val().about, snapshot.val().photoURL, snapshot.val().displayName
				)
			}else {
				this.profileNotSetted()
			}
		})
	}
	@action profileAlreadySetted(uniId, about, photoURL, displayName){
		if (photoURL !== this.photoURL || displayName !== this.displayName) {
			const updates = {}
			updates['unizoneUsers/' + this.uid + '/photoURL'] = this.photoURL
			updates['unizoneUsers/' + this.uid + '/displayName'] = this.displayName

			/*fir.database().ref('unizoneUsers/' + this.uid).update({photoURL, displayName})
			.then().catch( error => console.error(error))*/

			fir.database().ref('conversationsOfUsers/' + this.uid).once('value')
			.then( snapshot => {
				snapshot.forEach( conv => {
					updates['conversationsOfUsers/' + this.uid + '/' + conv.key + '/senderPhotoURL'] = this.photoURL
					updates['conversationsOfUsers/' + this.uid + '/' + conv.key + '/senderDisplayName'] = this.displayName
					updates['conversationsOfUsers/' + this.uid + '/' + conv.key + '/operationType'] = 4
					updates['lastCheckins/' + this.uid + '/displayName'] = this.displayName
					updates['lastCheckins/' + this.uid + '/photoURL'] = this.photoURL
				})
				fir.database().ref().update(updates)
			})
		}
		this.updateUser({uniId, about})
		this.appStore.gotoScreen('MainTabs')
	}
	@action profileNotSetted(){
		this.updateUser({uniId: null})
		this.appStore.gotoScreen('SetProfile')
	}

	@action loggedInUserNotFound(){
		this.updateUser({uid: null})
		this.appStore.gotoScreen('Login')
	}
	@action login(){
		this.logingIn = true

		SocialAuth.getFacebookCredentials( ["public_profile"], SocialAuth.facebookPermissionsType.read )
		.then(credentials => {
			const provider = firebase.auth.FacebookAuthProvider;
			const credential = provider.credential(credentials.accessToken);
			//console.log('cre', credential);
			fir.auth().signInWithCredential(credential)
			.then(user => {
				this.logingIn = false
			})
			.catch(error => {
				this.logingIn = false
				//console.error(error)
			})
		})
		.catch(error => {
			this.logingIn = false
			//console.log(error)
		})
	}
	@action setProfile(uniId, about){
		this.updateUser({uniId, about})

		fir.database().ref('/unizoneUsers/' + this.uid)
		.update({uniId, about, displayName: this.displayName, photoURL: this.photoURL})
		.then(() => {
			this.appStore.gotoScreen('MainTabs')
		})
		.catch( error => {
			//console.error(error)
		})
	}
	@action updateUniId(uniId){
		this.updateUser({uniId})

		fir.database().ref('/unizoneUsers/' + this.uid)
		.update({uniId})
		.then()
		.catch( error => {
			//console.error(error)
		})

		fir.database().ref('lastCheckins/' + this.uid)
		.update({uniId})
		.then()
		.catch( error => {
			//console.error(error)
		})
	}
	@action updateAbout(about){
		this.updateUser({about})

		fir.database().ref('/unizoneUsers/' + this.uid)
		.update({about})
		.then(() => {
			this.appStore.gotoScreen('BACK')
		})
		.catch( error => {
			console.error(error)
		})
	}
	@action logout(){
		fir.auth().signOut()
	}
}
