import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native'

@inject("appStore") @observer
export default class CheckinTitle extends Component {
	render() {
		const {checkinStore} = this.props.appStore

		let title = ''

		if (checkinStore.selectedVenueIndex) {
			const name = checkinStore.venues[checkinStore.selectedVenueIndex].name
			title = name.length > 20 ? name.substring(0, 20) + '...' : name
		} else {
			title = "Bir Yer Seç"
		}

		return (
			<Text style={styles.container}>{title}</Text>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		fontSize: 20,
		color: 'black',
		marginLeft: 10
	},
});
