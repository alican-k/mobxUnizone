import { observable, computed, autorun, action } from 'mobx'
import { NavigationActions } from 'react-navigation'
import { nav } from '../App'
import AuthStore from './authStore2'
import CheckinStore from './checkinStore'
import CafeStore from './cafeStore'
import ConversationStore from './conversationStore'
import IgnoreStore from './ignoreStore'
import NotificationStore from './notificationStore'

export default class AppStore {
	authStore = null
	checkinStore = null
	@observable cafeStore = null
	@observable conversationStore = null
	@observable ignoreStore = null
	@observable notificationStore = null

	constructor(){
		this.authStore = new AuthStore(this)
		this.checkinStore = new CheckinStore(this)

		autorun('autorun cafeStore initializer', () => {
			if(this.authStore.isUid && this.authStore.isUniId){
				this.cafeStore = new CafeStore(this)
				this.conversationStore = new ConversationStore(this)
				this.ignoreStore = new IgnoreStore(this)
				this.notificationStore = new NotificationStore(this)
			} else {
				this.cafeStore = null
				this.conversationStore = null
				this.ignoreStore = null
				if (this.notificationStore) {
					this.notificationStore.unwatchTokens()
					this.notificationStore = null
				}
			}
		})
	}

	@action gotoScreen(routeName){
		const {index, routes} = nav.state.nav
		const previousRouteName = routes[index].routeName

		if(routeName === 'BACK'){
			nav.dispatch(NavigationActions.back())
		}
		else if (previousRouteName === 'Login' || previousRouteName === 'SetProfile'
			|| routeName === 'Login' || routeName === 'SetProfile'
			|| routeName === 'MainTabs' ) {

			nav.dispatch(NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName })
				]
			}))
		} else {
			nav.dispatch(NavigationActions.navigate({ routeName }))
		}
	}
}
