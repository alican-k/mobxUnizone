import React, {Component} from 'react'
import {ActivityIndicator, Modal, Image, Text, View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observer, inject } from 'mobx-react/native'
import universities from "../../utils/universities"
import { cropLastWord } from "../../utils/string"
//var StyleSheet = require('react-native-debug-stylesheet');

@inject("appStore") @observer
export default class ModalProfile extends Component{
	render(){
		const {cafeStore} = this.props.appStore
		
		const comp = cafeStore.modalProfileLoaded
			? (
				<ScrollView contentContainerStyle={styles.container}>
					<Image
						style={styles.photoFromFacebook}
						source={{ uri: cafeStore.modalProfileUser.photoURL }}
					/>
					<Text style={styles.displayNameText}>
						{" "}{cropLastWord(cafeStore.modalProfileUser.displayName)}{" "}
					</Text>

					<Text style={styles.uniName}>
						{universities.filter((item) => item.id === cafeStore.modalProfileUser.uniId)[0].name}
					</Text>

					<Text style = {styles.about}>{cafeStore.modalProfileUser.about}</Text>

					<View style = {styles.sendMessageView}>
						<Icon.Button name='message' style={styles.sendMessageButton}
						onPress={()=> cafeStore.openConversationWith({
							uid: cafeStore.modalProfileUser.uid, uniId: cafeStore.modalProfileUser.uniId,
							photoURL: cafeStore.modalProfileUser.photoURL, displayName: cafeStore.modalProfileUser.displayName
						})}>
							<Text style={styles.sendMessageButtonText}>Mesajlaş</Text>
						</Icon.Button>
					</View>

					{/*<Button title='Mesaj'
					onPress={()=> cafeStore.openConversationWith({
						uid: cafeStore.modalProfileUser.uid, uniId: cafeStore.modalProfileUser.uniId,
						photoURL: cafeStore.modalProfileUser.photoURL, displayName: cafeStore.modalProfileUser.displayName
					})}/>*/}
				</ScrollView>
			)
			: <ActivityIndicator animating={true} style={[{height: 40}]} size="large" />

		return(
			<Modal style={styles.modal}
			onRequestClose={()=>{}}
			visible={cafeStore.modalProfileShown}>

				<TouchableOpacity style={ styles.closeButton }
				onPress={() => cafeStore.closeModalProfile()} >
					<Icon name="close" size={20} color="white" />
				</TouchableOpacity>

				{/*<Button style={styles.closeButton} title='kapat' onPress={() => cafeStore.closeModalProfile()} />*/}

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
	},
	checkinWarning: {
		padding: 5,
		textAlign: 'center',
		fontSize: 16,
		backgroundColor: 'steelblue',
		borderRadius: 8
	}
})
