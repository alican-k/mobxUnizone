import { observable, computed, autorun, action } from 'mobx'
import fir from '../firebase'

export default class IgnoreStore {
	constructor(appStore){
		this.appStore = appStore
		this.loadAndListenUsersIIgnored()
		this.loadAndListenUsersIgnoredMe()
	}

	@observable usersIIgnored = observable.map()
	@observable usersIgnoredMe = observable.map()

	loadAndListenUsersIIgnored(){
		const {uid} = this.appStore.authStore

		const ignoresRef = fir.database().ref('ignores').orderByKey().equalTo(uid)
		let isInitialLoad = false

		ignoresRef.on('child_added', (child) => {
			if (isInitialLoad) {
				this.usersIIgnored.set(child.val(), true)
			}
		})
		ignoresRef.on('child_removed', (child) => {
			if (isInitialLoad) {
				this.usersIIgnored.delete(child.val())
			}
		})
		ignoresRef.once('value', snapshot => {
			snapshot.forEach( item => {
				this.usersIIgnored.set(item.val(), true)
			})
			isInitialLoad = true
		})
	}

	loadAndListenUsersIgnoredMe(){
		const {uid} = this.appStore.authStore

		const ignoresRef = fir.database().ref('ignores').orderByValue().equalTo(uid)
		let isInitialLoad = false

		ignoresRef.on('child_added', (child) => {
			if (isInitialLoad) {
				this.usersIgnoredMe.set(child.key, true)
			}
		})
		ignoresRef.on('child_removed', (child) => {
			if (isInitialLoad) {
				this.usersIgnoredMe.delete(child.key)
			}
		})
		ignoresRef.once('value', snapshot => {
			snapshot.forEach( item => {
				this.usersIgnoredMe.set(item.key, true)
			})
			isInitialLoad = true
		})
	}

	@action ignore(ignoredUid){
		const {uid} = this.appStore.authStore
		const cid = this.appStore.conversationStore.currentConversationId
		const updates = {}

		updates['ignores/' + uid] = ignoredUid
		updates['conversationsOfUsers/' + uid + '/' + cid + '/ignored'] = true
		updates['conversationsOfUsers/' + uid + '/' + cid + '/operationType'] = 5

		fir.database().ref().update(updates)
		.then().catch( error => {
			//console.error(error)
		})
	}
	@action unIgnore(ignoredUid){
		const {uid} = this.appStore.authStore
		const cid = this.appStore.conversationStore.currentConversationId
		const updates = {}

		updates['ignores/' + uid] = null
		updates['conversationsOfUsers/' + uid + '/' + cid + '/ignored'] = null
		updates['conversationsOfUsers/' + uid + '/' + cid + '/operationType'] = 6

		fir.database().ref().update(updates)
		.then().catch( error => {
			//console.error(error)
		})
	}
}
