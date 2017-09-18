import React, {Component} from 'react'
import {ActivityIndicator, Button, Modal, Image, Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observer, inject } from 'mobx-react/native'
import universities from "../../../utils/universities"
import { cropLastWord } from "../../../utils/string"
//var StyleSheet = require('react-native-debug-stylesheet');

@inject("appStore") @observer
export default class ModalProfile2 extends Component{
	render(){
		const {conversationStore, ignoreStore} = this.props.appStore

		let ignoreTitle = ''
		let ignoreFunc = null

		if (ignoreStore.usersIgnoredMe.get(conversationStore.modalProfileUser.uid)) {

		} else if (ignoreStore.usersIIgnored.get(conversationStore.modalProfileUser.uid)) {
			ignoreTitle = 'Engeli Kaldır'
			ignoreFunc = () => ignoreStore.unIgnore(conversationStore.modalProfileUser.uid)
		} else {
			ignoreTitle = 'Engelle'
			ignoreFunc = () => ignoreStore.ignore(conversationStore.modalProfileUser.uid)
		}

		const ignoreComp = (
			<View style = {styles.sendMessageView}>
				<Icon.Button name='message' style={styles.sendMessageButton}
				onPress={ignoreFunc}>
					<Text style={styles.sendMessageButtonText}>{ignoreTitle}</Text>
				</Icon.Button>
			</View>
		)

		const comp = conversationStore.modalProfileLoaded
			? (
				<ScrollView contentContainerStyle={styles.container}>
					<Image
						style={styles.photoFromFacebook}
						source={{ uri: conversationStore.modalProfileUser.photoURL }}
					/>
					<Text style={styles.displayNameText}>
						{" "}{cropLastWord(conversationStore.modalProfileUser.displayName)}{" "}
					</Text>

					<Text style={styles.uniName}>
						{universities.filter((item) => item.id === conversationStore.modalProfileUser.uniId)[0].name}
					</Text>

					<Text style = {styles.about}>{conversationStore.modalProfileUser.about}</Text>

					{ignoreComp}
				</ScrollView>
			)
			: <ActivityIndicator animating={true} style={[{height: 40}]} size="large" />

		return(
			<Modal style={styles.modal}
			onRequestClose={()=>{}}
			visible={conversationStore.modalProfileShown}>

				<TouchableOpacity style={ styles.closeButton }
				onPress={() => conversationStore.closeModalProfile()} >
					<Icon name="close" size={20} color="white" />
				</TouchableOpacity>

				{comp}
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		top: 0,
        right: 0,
        bottom: 0,
        left: 0,
		backgroundColor: '#eeeeee',
	},
	closeButton: {
		backgroundColor: 'red',
		width: 30,
		height: 30,
		margin: 8,
		marginBottom: 0,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		padding: 30,
		paddingTop: 0,
		alignItems: 'center',
	},
	photoFromFacebook: {
        width: 160,
        height: 160,
        borderRadius: 80,
    },
	displayNameText: {
        marginTop: 20,
        fontSize: 24,
        color: "#222222",
		backgroundColor: 'white',
		textAlign: 'center',
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
    },
	uniName: {
        marginTop: 15,
        fontSize: 18,
        color: "#222222",
		backgroundColor: 'white',
		textAlign: 'center',
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
    },
	about: {
        marginTop: 15,
        fontSize: 14,
        color: "#222222",
		backgroundColor: 'white',
		textAlign: 'center',
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
    },
	sendMessageView: {
		alignSelf: 'center',
		marginTop: 30,
		marginBottom: 30,
	},
	sendMessageButtonText: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 3,
	}
})
