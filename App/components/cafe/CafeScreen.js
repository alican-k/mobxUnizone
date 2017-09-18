import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button';
import { observer, inject } from 'mobx-react/native'
import CheckinList from './CheckinList'
//var StyleSheet = require('react-native-debug-stylesheet');

@inject("appStore") @observer
export default class CafeScreen extends Component {

	render() {
		const {conversationStore} = this.props.appStore

		let comp = null
		const {cafeStore} = this.props.appStore

		if (cafeStore) {
			if (cafeStore.isCheckingin) {
				//comp = <Text>checkin yapılıyor ..</Text>
				comp = <ActivityIndicator animating={true} style={[{height: 40}]} size="large" />
			} else if (cafeStore.lastCheckinStatus === 'LOADING') {
				//comp = <Text>last checkins geliyor..</Text>
				comp = <ActivityIndicator animating={true} style={[{height: 40}]} size="large" />
			} else if (cafeStore.lastCheckinStatus === 'NOT_EXIST') {
				comp = <Text style={styles.checkinWarning}>Checkin yap, yakın çevreni keşfet!</Text>
				//comp = <CheckinList />
			} else if (cafeStore.checkinsStatus === 'LOADING') {
				//comp = <Text>checkin ler gelecek yenilenecek</Text>
			} else {
				comp = <CheckinList />
			}
		} else {
			//comp = <Text> cafeStore oluşturuluyor </Text>
			comp = <ActivityIndicator animating={true} style={[{height: 40}]} size="large" />
		}

//		buttonColor="rgba(231,76,60,1)"

		return (
			<View style={styles.container}>

				{comp}

				<ActionButton
					buttonColor='steelblue'
					onPress={() => cafeStore.checkinRequested() }
					icon={<Icon name="map-marker" style={styles.actionButton} />}
				/>
			</View>
		);
	}
	componenWillMount(){
		this.appStore.cafeStore.refreshCheckins()
	}

	actionButton = null
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		paddingTop: 10,
	},
	actionButton: {
		color: 'white',
		fontSize: 35,
	},
	checkinWarning: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 150,
	}
});
