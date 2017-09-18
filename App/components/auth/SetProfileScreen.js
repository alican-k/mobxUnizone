import React, { Component } from 'react';
import { Button, Image, View, ScrollView, Text, Picker, StyleSheet } from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
//var StyleSheet = require('react-native-debug-stylesheet');
import { observer, inject } from 'mobx-react/native'
import universities from "../../utils/universities"
import { cropLastWord } from "../../utils/string"
import { observable } from 'mobx'

const Item = Picker.Item;

@inject("appStore") @observer
export default class SetProfileScreen extends Component {

	@observable uniId = 'none'
	@observable about = ''

	render() {
		const { authStore } = this.props.appStore
		const uniItems = [
			<Item label="Üniversiteniz.." color="#333333" value="none" key="none" />
		].concat(universities.map(item => <Item label={item.name} color="#333333" value={item.id} key={item.id} /> ));

		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image
                    style={styles.photoFromFacebook}
                    source={{ uri: authStore.photoURL }}
                />

				<Text style={styles.displayNameText}>
                    {" "}{cropLastWord(authStore.displayName)}{" "}
                </Text>

				<View style={styles.pickerContainer}>
					<Picker style={styles.picker} mode="dialog"
					selectedValue={this.uniId}
					onValueChange={(val) => this.uniId = val} >
						{uniItems}
					</Picker>
				</View>
				{/*<Picker style={styles.picker} mode="dialog"
					selectedValue={this.uniId}
					onValueChange={(val) => this.uniId = val} >
					{uniItems}
				</Picker>*/}

				<View style = {styles.startView}>
					<Icon2.Button name='md-log-out' style={styles.startButton}
					disabled={this.uniId === "none" ? true : false}
					onPress={ () => authStore.setProfile(this.uniId, this.about)} >
						<Text style={styles.startButtonText}>Başla</Text>
					</Icon2.Button>
				</View>

				{/*<Button
					title='Başla'
					disabled={this.uniId === "none" ? true : false}
                    onPress={() => authStore.setProfile(this.uniId, this.about)}
                />*/}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		flexGrow: 1,
		alignItems: 'stretch',
		padding: 15,
		paddingTop: 0,
	},
	pickerContainer: {
		alignSelf: 'stretch',
		backgroundColor: 'white',
		paddingLeft: 50,
		paddingRight: 50,
		marginTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
	},
	photoFromFacebook: {
        width: 160,
        height: 160,
        borderRadius: 80,
        marginTop: 20,
		alignSelf: 'center'
    },
    displayNameText: {
        marginTop: 20,
        fontSize: 24,
        color: "#222222",
		backgroundColor: 'white',
		textAlign: 'center',
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
    },
	startView: {
		alignSelf: 'center',
		marginTop: 30,
		marginBottom: 30,
	},
	startButtonText: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 3,
	}
});
