import React from "react";
import { Image, Text, View, StyleSheet} from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react/native'
import { cropLastWord } from "../../utils/string"
//var StyleSheet = require('react-native-debug-stylesheet')

var moment = require('moment')
var trLocale = require('moment/locale/tr')
moment.locale('tr', trLocale)

/**********************************************************************/
@observer
export default class Conversation extends React.Component {

	render(){
		const {convId, convData} = this.props
		const lastMessage = convData.lastMessage.length > 23
			? convData.lastMessage.substring(0, 23) + '...'
			: convData.lastMessage

		return (
			<View style = {[styles.container, /* selectedStyles */]}>

				<Image
					style={styles.photoFromFacebook}
					source={{ uri: convData.receiverPhotoURL }}
				/>
				<View style={styles.right}>
					<Text style={styles.name}>{cropLastWord(convData.receiverDisplayName)}</Text>
					<View style={styles.altContainer}>
						{/*<Text style={styles.lastMessageTime}>{new Date(convData.lastMessageTime).toUTCString()}</Text>*/}
						<Text style={styles.lastMessage}>{lastMessage}</Text>
						<Text style={ convData.unreadCount > 0 ? styles.unRead : {}}>
							{convData.unreadCount === 0 ? '' : convData.unreadCount}
						</Text>
					</View>
					<Text style={styles.lastMessageTime}>{moment(convData.lastMessageTime).format('dddd, H:mm')}</Text>
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
		borderBottomColor: '#cccccc',
		flexDirection: 'row'
    },
	photoFromFacebook: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
	right: {
		flexGrow: 1,
		paddingLeft: 13
	},
	name: {
		color: 'cornflowerblue',
		fontSize: 20,
	},
	altContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexGrow:1
	},
	lastMessageTime: {
		fontSize: 12
	},
	lastMessage: {
		paddingTop: 3,
		fontSize: 14,
		fontWeight: 'bold',
	},
	unRead: {
		color: 'white',
		backgroundColor: 'green',
		fontWeight: 'bold',
		height: 20,
		width: 20,
		textAlign: 'center',
		borderRadius: 10,
		paddingTop: 0,
	}
});
