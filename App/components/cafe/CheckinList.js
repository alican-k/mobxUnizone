import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, ListView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import Checkin from './Checkin'
import UniSelector from './UniSelector'
import ModalProfile from './ModalProfile'
//var StyleSheet = require('react-native-debug-stylesheet');

@inject("appStore") @observer
export default class CheckinList extends Component {

	ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.uid !== r2.uid});

	render() {
		const {cafeStore} = this.props.appStore
		const {uid} = this.props.appStore.authStore
		let refreshing = cafeStore.checkinsStatus === 'LOADING' ? true : false

		return (
			<View style={styles.container}>
				<UniSelector style={styles.uniSelector} />
				<ModalProfile />

				<ListView style={styles.listView} enableEmptySections={true}
				dataSource={this.ds.cloneWithRows(cafeStore.checkins.toJS())}
				refreshControl={
					<RefreshControl
					refreshing={ refreshing }
					onRefresh={ () => cafeStore.refreshCheckins() } />
				}
				renderRow={(checkin, sectionID, rowID, highlightRow) => (
					<TouchableOpacity
					activeOpacity = {0.6}
					onPress={() => {
						if (uid !== checkin.uid) {
							cafeStore.openModalProfile(checkin.uid)
						}
					}}>
						<Checkin checkin={checkin} />
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
		marginTop: 2
	},
	uniSelector: {
		alignSelf: 'center'
	}
});
