import React, { Component } from 'react';
import { Button, Image, View, Text, Picker, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
//var StyleSheet = require('react-native-debug-stylesheet');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native'
import universities from "../../utils/universities";
import { cropLastWord } from "../../utils/string"

const Item = Picker.Item

@inject("appStore") @observer
export default class ProfileScreen extends Component {
	render() {
		const {authStore} = this.props.appStore

		const uniItems = universities.map(item => <Item label={item.name} color="#333333" value={item.id} key={item.id} /> );

		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image
					style={styles.photoFromFacebook}
					source={{ uri: authStore.photoURL }}
				/>
				<Text style={styles.displayNameText}>
					{" "}{cropLastWord(authStore.displayName)}{" "}
				</Text>

				<View style={styles.pickerContainer}>
					<Picker style={styles.picker} mode="dialog"
						selectedValue={authStore.uniId}
						onValueChange={(val) => authStore.updateUniId(val)} >
						{uniItems}
					</Picker>
				</View>

				<View style = {styles.aboutView}>
					<View style = {styles.aboutTopView}>
						<Text style = {styles.aboutViewTitle}>Hakkımda: </Text>
						<TouchableOpacity style={ styles.editAboutButton }
						onPress={ () => this.props.appStore.gotoScreen('EditAbout') } >
							<Icon name="mode-edit" size={20} color="steelblue" />
						</TouchableOpacity>
					</View>
					<Text style = {styles.about}>{authStore.about}</Text>
				</View>

				<View style = {styles.logoutView}>
					<Icon2.Button name='md-log-out' style={styles.logout}
					onPress={ () => authStore.logout()} >
						<Text style={styles.logOutText}>Çıkış yap</Text>
					</Icon2.Button>
				</View>

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		flexGrow: 1,
		alignItems: 'stretch',
		padding: 15,
		paddingTop: 0,
	},
	pickerContainer: {
		alignSelf: 'stretch',
		backgroundColor: 'white',
		paddingLeft: 50,
		paddingRight: 50,
		marginTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
	},
	photoFromFacebook: {
        width: 160,
        height: 160,
        borderRadius: 80,
        marginTop: 20,
		alignSelf: 'center'
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
	aboutView: {
		marginTop: 20,
		alignSelf: 'stretch',
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
		padding: 20,
	},
	aboutTopView: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		marginBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
	},
	aboutViewTitle: {
		fontSize: 18,
		paddingTop: 6,
	},
	editAboutButton: {
		//backgroundColor: 'yellow',
		padding: 8
	},
	logoutView: {
		alignSelf: 'center',
		marginTop: 30,
		marginBottom: 30,
	},
	logOutText: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 3,
	}
});
