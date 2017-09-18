import React, { Component } from 'react';
import { Alert, Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
//var StyleSheet = require('react-native-debug-stylesheet')

import { observer, inject } from 'mobx-react/native'

@inject("appStore") @observer
export default class ConversationScreen extends Component {

	render() {
		const {conversationStore, ignoreStore} = this.props.appStore

		return (
			<View style={styles.container}>
				<GiftedChat style={styles.chat}
				messages={conversationStore.messages.toJS()}
				onSend={ (messages) => {
					if (ignoreStore.usersIgnoredMe.get(conversationStore.currentConversationUserData.uid)) {
						Alert.alert(
							':(',
							'Bu kullanıcı sizi engellediği için mesaj gönderemezsiniz',
							[
								{text: 'OK', onPress: () => {
									//console.log('OK Pressed')
								}},
							],
							{ cancelable: false }
						)
					} else if (ignoreStore.usersIIgnored.get(conversationStore.currentConversationUserData.uid)) {
						Alert.alert(
							':(',
							'Bu kullanıcıyı daha önce engellemiştiniz. Mesaj gönderebilmek için engeli kaldırın.',
							[
								{text: 'OK', onPress: () => {
									//console.log('OK Pressed')
								}},
							],
							{ cancelable: false }
						)
					} else {
						conversationStore.sendMessage(messages[0].text)
					}
				}}
				user={{_id:this.props.appStore.authStore.uid}}
				locale='tr'
				isAnimated={true}/>
			</View>
		);
	}
	componentWillUnmount(){
		this.props.appStore.conversationStore.closeConversation()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
	},
	chat: {
		flex:1,

	}
});
