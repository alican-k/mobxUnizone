import React, { Component } from 'react';
import { ActivityIndicator, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
//var StyleSheet = require('react-native-debug-stylesheet');
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { observer, inject } from 'mobx-react/native'
import { observable } from "mobx"

@inject("appStore") @observer
export default class LoginScreen extends Component {
	render() {
		const { authStore } = this.props.appStore
		const comp = authStore.showLogin && !authStore.logingIn
			? (
				<Icon.Button name='facebook'
					style={styles.loginButton}
					backgroundColor = 'navy'
					onPress = { () => authStore.login() }
					>
					<Text style={styles.loginButtonText}>Facebook ile giriş</Text>
				</Icon.Button>
			)
			: <ActivityIndicator animating={true} style={[{height: 40}]} size="large" />

		return (
			<Image style={styles.container}
			source={require('../../assets/images/background2.jpeg')} >
				<View style={styles.top}>
					<View style={styles.altTop}>
						<Image source={require('../../assets/images/yenilogo.png')} style={styles.logo}/>
						<Text style={styles.appName}>UNIZONE</Text>
					</View>
					<Text style={styles.desc}>MOBİL KAMPÜS</Text>
					<Text style={styles.desc}>Kampüste kim, nerede? Tanış, sosyalleş!</Text>
					<Text style={styles.desc}>Ev Arkadaşı - Kafa dengini bul</Text>
					<Text style={styles.desc}>Aktivite, Eğlence - Spor arkadaşı, parti, ortamlar..</Text>
					<Text style={styles.desc}>Ders Notu, Ödev - Ön sırada oturan arkadaşlara ulaş!</Text>
				</View>
				{comp}
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'space-between',
		//resizeMode: Image.resizeMode.contain,
		width: null,
		height: null
	},
	top: {

	},
	altTop: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 8,
		paddingBottom: 8,
		backgroundColor: 'navy',
		marginBottom: 8,
	},
	logo: {
		height: 40,
		width: 40,
		borderRadius: 5,
		marginRight: 15
	},
	appName: {
		color: '#eeeeee',
		fontSize: 36
	},
	desc: {
		color: '#555555',
		marginTop: 7,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	loginButton: {
		borderRadius: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginButtonText: {
		fontSize: 20,
		color: 'white'
	}
});
