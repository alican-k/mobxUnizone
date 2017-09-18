import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Image, Platform, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {inject, observer} from 'mobx-react/native'
import {HeaderBackButton} from 'react-navigation'
import ModalProfile2 from './ModalProfile2'
//var StyleSheet = require('react-native-debug-stylesheet')

@inject("appStore") @observer
export default class ConversationHeader extends Component{
	render(){
		const {conversationStore} = this.props.appStore

		if (conversationStore.currentConversationUserData) {
			return (
				<TouchableOpacity style={styles.container}
				onPress={() => {
					//console.log('ssf',conversationStore.currentConversationUserData.uid)
					conversationStore.openModalProfile(conversationStore.currentConversationUserData.uid)
				}}>
					<ModalProfile2 />
					<Image style={styles.photoFromFacebook}
					source={{ uri: conversationStore.currentConversationUserData.photoURL }}/>

					<Text style={styles.displayName}> {conversationStore.currentConversationUserData.displayName} </Text>
				</TouchableOpacity>
			)
		} else return null
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	icon: {
		marginLeft: 10,
		marginRight: 15
	},
	photoFromFacebook: {
        width: 36,
        height: 36,
        borderRadius: 18,
		marginLeft: (Platform.OS === 'ios') ? -150 : 10,
		marginRight: (Platform.OS === 'ios') ? 0 : 5
    },
	displayName: {
		paddingTop: 5,
		fontSize: 18
	}
})
