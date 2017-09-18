import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native'

@inject("appStore") @observer
export default class CheckinHeader extends Component {
	render() {
		const {checkinStore} = this.props.appStore

		const comp = checkinStore.selectedVenueIndex ?
			(
				<Button title='Checkin!' style={styles.container}
					onPress={ () => checkinStore.checkin() }
				/>
			)
			: null

		return <View>{comp}</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
