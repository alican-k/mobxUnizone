import { observable, computed, autorun, action } from 'mobx'
import fir from '../firebase'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Platform } from 'react-native'

export default class NotificationStore {
	constructor(appStore){
		this.appStore = appStore
		this.watchTokens()
		//this.watchOpenedFromTray()
	}

	@observable openedFromTray = false

	watchTokens(){
		FCM.requestPermissions()

		FCM.getFCMToken().then(token => {
            //console.log('token:', token)
            this.saveToken(token)
        });

		this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
			//console.log("TOKEN (refreshUnsubscribe)", token);
			this.saveToken(token);
		})

		FCM.getInitialNotification().then(notif => {
			//console.log("INITIAL NOTIFICATION", notif)
		})

		this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
			//console.log("Notification", notif)
			if(notif.local_notification){
				//console.log('local notif')
				return
			}
			if(notif.opened_from_tray){
				//console.log('opened from tray')
				this.appStore.gotoScreen('FromTray')
				return
			}

			if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
					//console.log('notif remote')
	                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
	                break;
                case NotificationType.NotificationResponse:
					//console.log('notif response')
	                notif.finish();
	                break;
                case NotificationType.WillPresent:
					//console.log('notif willpresent');
	                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
	                break;
              }
            }


			// FCM.presentLocalNotification({
			// 	title: notif.title,
			// 	body: notif.body,
			// 	priority: "high",
			// 	click_action: notif.click_action,
			// 	show_in_foreground: false,
			// 	local: true,
			// 	collapse_key: 'messageNotification'
			// })

		})
	}

	unwatchTokens(){
		this.notificationListener.remove()
    	this.refreshTokenListener.remove()
	}

	saveToken(token){
		const updates = {}
		updates['tokens/' + this.appStore.authStore.uid] = token
		fir.database().ref().update(updates)
	}

	// watchOpenedFromTray(){
	// 	autorun('autorun watchOpenedFromTray', () => {
	// 		if (this.openedFromTray === true) {
	// 			this.appStore.gotoScreen('FromTray')
	// 			this.openedFromTray = false
	// 		}
	// 	})
	// }
}
