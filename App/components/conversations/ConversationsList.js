import React, { Component } from 'react';
import { ActivityIndicator, ListView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import Conversation from './Conversation'

@inject("appStore") @observer
export default class ConversationsList extends Component {

	ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1[0] !== r2[0]});

	render() {
		const {conversationStore} = this.props.appStore

		return (
			<View style={styles.container}>
				<ListView style={styles.listView} enableEmptySections={true}
				dataSource={this.ds.cloneWithRows(conversationStore.conversations.entries().sort( function(a, b){
					return b[1].lastMessageTime - a[1].lastMessageTime
				}))}
				renderRow={
					(entry, sectionID, rowID, highlightRow) => {
						//console.log('e:',entry);
						return (
							<TouchableOpacity
							activeOpacity = {0.6}
							onPress={() => {
								conversationStore.openConversationWith({
									uid: entry[1].receiverId, /*uniId: cafeStore.modalProfileUser.uniId,*/
									photoURL: entry[1].receiverPhotoURL, displayName: entry[1].receiverDisplayName
								})
							}}>
								<Conversation convId={entry[0]} convData={entry[1]} />
							</TouchableOpacity>
						)
					}
				}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'stretch',
		marginTop: 20
	},
	listView: {
	}
});
