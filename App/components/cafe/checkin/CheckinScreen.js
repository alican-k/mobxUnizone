import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import VenueList from './VenueList'

@inject("appStore") @observer
export default class CheckinScreen extends Component {
	render() {
		const {authstore, checkinStore} = this.props.appStore
		let comp = null;

		if (!this.props.appStore.checkinStore.isLocation) {
			comp = <Text style={{marginTop: 50}}>cihazınızın konum bilgisine erişilemedi..</Text>
		} else if (checkinStore.venuesStatus === 'VENUES_LOADED') {
			if (checkinStore.venues.length) {
				comp = <VenueList />
			} else {
				comp = <Text style={{marginTop: 50}}>venue yok..</Text>
			}
		} else if(checkinStore.venuesStatus === 'VENUES_LOADING'){
			comp = <ActivityIndicator animating={true} style={[{height: 120}]} size="large" />
		} else{throw new Error()}

		return (
			<View style={styles.container}>
				{comp}
			</View>
		)
	}
	componentWillMount(){
		if (this.props.appStore.checkinStore.isLocation) {
			this.props.appStore.checkinStore.updateVenuesStatus('VENUES_EXPECTED')
		}
	}
	componentWillUnmount(){
		this.props.appStore.checkinStore.updateVenuesStatus('VENUES_NOT_EXPECTED')
		this.props.appStore.cafeStore.setIsCheckinRequested(false)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
