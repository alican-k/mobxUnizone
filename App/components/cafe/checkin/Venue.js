import React from "react";
import { Text, View, StyleSheet } from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react/native'
//var StyleSheet = require('react-native-debug-stylesheet')

/**********************************************************************/
@observer
export default class Venue extends React.Component {

	render(){
		const {venue} = this.props
		const selectedStyles = venue.selected ?  {
			backgroundColor: '#ccccdd',
		} : { }

		return (
			<View style = {[styles.container, selectedStyles]}>
				<View style={styles.top}>
					<Text style={styles.name}>{venue.name}</Text>
					<Text style={styles.distance}>{venue.distance}m</Text>
				</View>
				<View style={styles.bottom}>
					<Text style={styles.address}>{venue.address}</Text>
					<Text style={styles.category}>{venue.category}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		padding: 8,
		paddingLeft: 14,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc'
    },
	top: {
		flex: 1,
		flexDirection: 'row',
	},
	name: {
		flex: 5,
		color: 'darksalmon',
		fontSize: 16,
	},
	distance: {
		flex: 1,
		fontStyle: 'italic',
		fontSize: 12,
		paddingTop: 3,
	},
	bottom: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 3,
	},
	category: {
		//flex: 1,
		fontWeight: 'bold',
	},
	address: {
		//flex: 3,
		fontSize: 11,
		marginTop: 3,
		//marginLeft: 18,
	},
});
