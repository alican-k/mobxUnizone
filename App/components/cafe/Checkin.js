import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react/native'
//var StyleSheet = require('react-native-debug-stylesheet')
import { cropLastWord } from "../../utils/string"
import universities from "../../utils/universities"

/**********************************************************************/
@observer
export default class Checkin extends React.Component {

	render(){
		const {checkin} = this.props
		const uniName = universities.filter( (item) => item.id === checkin.uniId)[0].name

		return (
			<View style = {[styles.container, /* selectedStyles */]}>
				<Image
					style={styles.photoFromFacebook}
					source={{ uri: checkin.photoURL }}
				/>
				<View style={styles.right} >
					<Text style={styles.name}>{cropLastWord(checkin.displayName)}</Text>
					{/*<Text style={styles.uniName}>{uniName}</Text>*/}
					<Text style={styles.checkinName}>{checkin.name}</Text>
					<Text style={styles.address}>{checkin.address}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		flexDirection: 'row',
		padding: 8,
		paddingLeft: 14,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc'
    },
	photoFromFacebook: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
	right: {
		marginLeft: 20,
		justifyContent: 'flex-start'
	},
	name: {
		color: 'steelblue',
		fontSize: 18,
	},
	checkinName: {
		fontSize: 16,
		color: 'darksalmon',
		fontWeight: 'bold',
	},
	address: {
		//flex: 3,
		fontSize: 11,
		marginTop: 3,
		//marginLeft: 18,
	},
});
