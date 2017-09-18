import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//var StyleSheet = require('react-native-debug-stylesheet');
import Icon from 'react-native-vector-icons/FontAwesome';

import { observer, inject } from 'mobx-react/native'

@inject("appStore") @observer
export default class MessageTabIcon extends Component {
	render() {
		const count = this.props.appStore.conversationStore
			? this.props.appStore.conversationStore.unreadConversations
			: 0
		const color = count > 0 ? 'gold' : this.props.tintColor

		return (
			<View style={styles.container}>
				<Icon name='comments-o' color={ color } size={20} style={styles.iconStyle}/>
				<Text style={[styles.count, {color: this.props.tintColor}]}></Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		// width: 70,
		// backgroundColor: 'red',
	},
	iconStyle: {
		// borderBottomColor: 'red',
		// borderBottomWidth: 2,
		// //borderRadius: 1
	},
	count: {

	}
});
