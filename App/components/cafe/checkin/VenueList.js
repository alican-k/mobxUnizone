import React, { Component } from 'react';
import { ActivityIndicator, ListView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import Venue from './Venue'

@inject("appStore") @observer
export default class CheckinScreen extends Component {

	ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

	render() {
		const {checkinStore} = this.props.appStore

		return (
			<View style={styles.container}>
				<ListView style={styles.listView}
				dataSource={this.ds.cloneWithRows(checkinStore.venues.toJS())}
				renderRow={(venue, sectionID, rowID, highlightRow) => (
					<TouchableOpacity
					activeOpacity = {0.6}
					onPress={() => {
						checkinStore.selectVenue(rowID)
						//console.log(rowID);
					}}>
						<Venue venue={venue} />
					</TouchableOpacity>
				)}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listView: {

	}
});
