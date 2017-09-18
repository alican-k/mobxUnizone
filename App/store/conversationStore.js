import { observable, computed, autorun, action } from 'mobx'
import fir from '../firebase'
import firebase from 'firebase'
import ConversationsScreen from '../components/conversations/ConversationsScreen'

export default class ConversationStore {
	constructor(appStore){
		this.appStore = appStore
		this.loadAndListenConversations()
	}

	@observable conversations = observable.map()
	@computed
	get unreadConversations(){
		//console.log('entries:', this.conversations.entries());
		return this.conversations.entries().filter( (conversation) => conversation[1].unreadCount > 0).length
	}
	@observable uidsConversationMade = observable.map()				// bu CheckinList de dinleniyor olacak.

	@observable currentConversationUserData = { uid: null, uniId: null}

	currentConversationId = null
	findCurrentConversationId(){
		return this.uidsConversationMade.get(this.currentConversationUserData.uid)
	}

	@observable messages = []
	messagesOffFunction = null
	messagesRef = null

	@action loadAndListenConversations(){
		const {uid} = this.appStore.authStore
		const conversationsRef = fir.database().ref('conversationsOfUsers/' + uid)
		let isInitialLoad = false

		conversationsRef.on('child_added', (child) => {
			if (isInitialLoad) {
				this.conversations.set(child.key, child.val())
				this.uidsConversationMade.set(child.val().receiverId, child.key)
			}
		})
		conversationsRef.on('child_changed', (child) => {				// burda eğer pencere açıksa ve unreadCount > 0 ise
			if (isInitialLoad) {										// sıfırla. veya onClose da sıfırlayalım.
				this.conversations.set(child.key, child.val())
			}
		})
		conversationsRef.on('child_removed', (child) => {					// removed lazım olur mu ki ???
			if (isInitialLoad) {
				this.conversations.delete(child.key)
				this.uidsConversationMade.delete(child.val().receiverId)
			}
		})

		conversationsRef.once('value', snapshot => {
			snapshot.forEach( item => {
				this.conversations.set(item.key, item.val())
				this.uidsConversationMade.set(item.val().receiverId, item.key)
			})
			isInitialLoad = true
		})
	}

	@action openConversationWith(userData){
		this.currentConversationUserData = userData
		this.currentConversationId = this.findCurrentConversationId()

		//console.log('openConWith userData:', userData);

		this.appStore.gotoScreen('Conversation')

		if (this.currentConversationId) {
			//console.log('conversaiton id null değil')

			fir.database().ref('conversationsOfUsers/' + this.appStore.authStore.uid + '/' + this.currentConversationId)
			.update({
				isOpen: true,
				operationType: 0,
				unreadCount: 0
			})

			this.loadAndListenMessages()
		} else {
			//console.log('conversaiton id null');
		}
	}

	@action createNewConversation(firstMessage){

		const currentTime = firebase.database.ServerValue.TIMESTAMP
		const {uid} = this.appStore.authStore

		const newConversationRef = fir.database().ref('conversations').push()
		newConversationRef.set({member1: this.appStore.authStore.uid, member2: this.currentConversationUserData.uid})

		const newConversationOfUser = {
			lastMessage: firstMessage,
			lastMessageTime: currentTime,
			senderPhotoURL: this.appStore.authStore.photoURL,
			senderDisplayName: this.appStore.authStore.displayName,
			receiverId: this.currentConversationUserData.uid,
			receiverPhotoURL: this.currentConversationUserData.photoURL,
			receiverDisplayName: this.currentConversationUserData.displayName,
			unreadCount: 0,
			isOpen: true,
			operationType: 1
		}

		fir.database().ref('conversationsOfUsers/' + uid + '/' + newConversationRef.key).set(newConversationOfUser)
	}

	@action loadAndListenMessages(){
		this.messages = []
		this.currentConversaitonId = this.findCurrentConversationId()
		this.messagesRef = fir.database().ref('messages/' + this.currentConversaitonId)
		let isInitialLoad = false

		this.messagesOffFunction = this.messagesRef.on('child_added', (child) => {
			if (true) {
				let name = null
				if (child.val().senderId === this.appStore.authStore.uid) {
					name = this.appStore.authStore.displayName
				} else {
					name = this.currentConversationUserData.displayName
				}
				const message = {
					_id: child.key, text: child.val().text, createdAt: child.val().time, user: {
						_id: child.val().senderId,
						name
					}
				}
				//console.log('nnn:', message);
				this.messages.unshift(message)
			}
		})

		// this.messagesRef.once('value', snapshot => {
		// 	snapshot.forEach( child => {
		// 		let name = null
		// 		if (child.val().senderId === this.appStore.authStore.uid) {
		// 			name = this.appStore.authStore.displayName
		// 		} else {
		// 			name = this.currentConversationUserData.displayName
		// 		}
		// 		const message = {
		// 			_id: child.key, text: child.val().text, createdAt: child.val().time, user: {
		// 				_id: child.val().senderId,
		// 				name
		// 			}
		// 		}
		// 		console.log('mmm:', message);
		// 		this.messages.unshift(message)
		// 	})
		//
		// 	isInitialLoad = true
		// })

	}

	@action sendMessage(message){
		const {uid} = this.appStore.authStore
		const currentTime = firebase.database.ServerValue.TIMESTAMP

		if (!Boolean(this.currentConversationId)) {
			this.createNewConversation(message)
			this.loadAndListenMessages()
			this.currentConversationId = this.findCurrentConversationId()
		}

		const newMessageRef = fir.database().ref('messages/' + this.currentConversationId).push()
		const newMessage = { text: message, time: currentTime, senderId: uid }

		newMessageRef.set( { text: message, time: currentTime, senderId: uid, receiverId: this.currentConversationUserData.uid } )

		fir.database().ref('conversationsOfUsers/' + uid).child(this.currentConversationId).update({
			lastMessage: message, lastMessageTime: currentTime, operationType: 2
		})
	}
	closeConversation(){
		/*const {uid} = this.appStore.authStore

		fir.database().ref('conversationsOfUsers/' + uid + '/' + this.currentConversationId).update({
			unreadCount: 0, operationType: 0
		})

		this.messagesRef.off('child_added', this.messagesOffFunction)
		this.messagesRef = null
		this.messagesOffFunction = null
		*/
		if (this.currentConversationId) {
			const {uid} = this.appStore.authStore

			fir.database().ref('conversationsOfUsers/' + uid + '/' + this.currentConversationId).update({
				isOpen: false, operationType: 0
			})

			if (this.messagesRef) {
				this.messagesRef.off('child_added', this.messagesOffFunction)
			}
			this.messagesRef = null
			this.messagesOffFunction = null
		}
		this.messages = []
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
