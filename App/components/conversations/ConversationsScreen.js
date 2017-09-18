import React, { Component } from 'react';
import {ActivityIndicator, Button, View, Text, TextInput, StyleSheet } from 'react-native';
import ConversationsList from './ConversationsList'
//var StyleSheet = require('react-native-debug-stylesheet');

import { observer, inject } from 'mobx-react/native'

@inject("appStore") @observer
export default class ConversationsScreen extends Component {
	render() {
		const {conversationStore} = this.props.appStore
		let comp = null

		if (conversationStore) {
			if (conversationStore.conversations.size) {
				comp = <ConversationsList />
			} else {
				comp = (
					<View style={styles.noMessageWarningView}>
						<Text style={styles.noMessageWarning}>Hiç mesajınız yok gibi görünüyor.</Text>
						<Text style={styles.noMessageWarning}>Cafe bölümünden etrafındaki insanlara ulaş!</Text>
					</View>
				)
			}
		} else {
			comp = <Text style={{marginTop: 50}}>..</Text>
		}


		return (
			<View style={[
				styles.container,
				conversationStore && conversationStore.conversations.size ? {} : {alignItems: 'center'}
			]}>
				{comp}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noMessageWarningView: {
		marginTop: 130,
	},
	noMessageWarning: {
		textAlign: 'center',
		fontSize: 16,
		marginTop: 5,
	}
});
