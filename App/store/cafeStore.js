import { observable, computed, autorun, action, runInAction } from 'mobx'
import fir from '../firebase'

export default class CafeStore {
	constructor(appStore){
		this.appStore = appStore
		this.pickedUniId = this.appStore.authStore.uniId
		this.loadLastCheckin()
		this.loadCheckinsWhenNecessary()
	}

	loadCheckinsWhenNecessary(){
		//console.log('loadCheckinsWhenNecessary')

		autorun('autorun load checkins when necessary', () => {
			if (this.isCheckingin === false && this.checkinsStatus === 'LOADING' && this.lastCheckinStatus !== 'LOADING') {
				//console.log('loadLastCheckin true');
				this.loadCheckins()
			} else {
				//console.log('loadLastCheckin false');
			}
		})
	}

	@observable pickedUniId = null
	@observable uniSelectorShown = false
	@action setUniSelectorShown(b) { this.uniSelectorShown = b }
	@action setPickedUniId(id){
		this.pickedUniId = id
	}

	@observable lastCheckin = {
		// foursquare'den gelen veriler
		frsqrId: null,
		name: null, category: null, address: null, latitude: null, longitude: null, city:null
	}
	@observable lastCheckinStatus = 'LOADING'					//     NOT_EXIST   EXISTS
	@action loadLastCheckin(){
		this.lastCheckinStatus = 'LOADING'

		fir.database().ref('lastCheckins/' + this.appStore.authStore.uid).once('value')
		.then(snapshot => {
			if (snapshot.val()) {
				this.lastCheckin = snapshot.val()
				this.lastCheckinStatus = 'EXISTS'
			} else {
				this.lastCheckin = {frsqrId:null,name:null,category:null,address:null,latitude:null,longitude:null,city:null}
				this.lastCheckinStatus = 'NOT_EXIST'
			}
		})
	}

	@observable isCheckinRequested = false	// bu değere göre acction buton disable olacak. amaç iki kez basılmasını engellemek
	@action checkinRequested(){
		if (this.isCheckinRequested) {
			return
		}
		this.isCheckinRequested = true
		this.appStore.gotoScreen('Checkin')
	}
	@action setIsCheckinRequested(v){
		this.isCheckinRequested = v
	}

	@observable isCheckingin = false

	@action checkin(venue){
		this.isCheckingin = true

		const {uid, uniId, displayName, photoURL} = this.appStore.authStore

		const pushToLastCheckin = () => {
			fir.database().ref('/lastCheckins/' + uid)
			.set({ uniId, displayName, photoURL, ...venue})
			.then( () => this.isCheckingin = false)
			.catch(error => {
				//console.error(error)
			})
		}

		fir.database().ref('/lastCheckins/' + uid).once('value')
		.then( snapshot => {
			if (snapshot.val()) {
				const temp = fir.database().ref('checkins').push()
				temp.set({ uid, ...snapshot.val()})
				.then( pushToLastCheckin )
				.catch( error => {
					//console.error(error)
				})
			} else {
				pushToLastCheckin()
			}
		})
		this.lastCheckin = venue
		this.lastCheckinStatus = 'EXISTS'

		this.checkinsStatus = 'LOADING'

		this.appStore.gotoScreen('BACK')
	}

	@observable checkins = []
	@observable checkinsStatus = 'LOADING'						// LOADED

	@action loadCheckins(){
		this.checkins = []
		this.checkinsStatus = 'LOADING'

		fir.database().ref('lastCheckins').orderByChild('uniId').equalTo(this.pickedUniId).once('value')
		.then( snapshot => {
			snapshot.forEach( (item) => {

				// bazen veritabanına sadece uniId si olan kayıt ekliyor nedense, bunları gösterme.
				if (Object.keys(item.val()).length > 3) {
					this.checkins.push({uid: item.key, ...item.val()})
				}

			})
			this.checkinsStatus = 'LOADED'
		})
		.catch( error => {
			//console.error(error)
		})
	}
	@action refreshCheckins(){
		this.checkinsStatus = 'LOADING'
	}

	openConversationWith(userData){
		this.appStore.conversationStore.openConversationWith(userData)
		this.closeModalProfile()
	}

	@observable modalProfileShown = false
	@observable modalProfileLoaded = false
	@observable modalProfileUser = {
		uid: null, displayName: null, photoURL: null, about: null, uniId: null
	}

	@action openModalProfile(uid){
		this.modalProfileShown = true

		fir.database().ref('unizoneUsers/' + uid).once('value')
		.then( snapshot => {
			this.modalProfileUser = {uid, ...snapshot.val() }
			this.modalProfileLoaded = true
		})
		.catch( error => {
			//console.error(error)
		})
	}
	@action closeModalProfile(){
		this.modalProfileShown = false
		this.modalProfileLoaded = false
		this.modalProfileUser = { uid: null, displayName: null, photoURL: null, about: null, uniId: null }
	}
}
