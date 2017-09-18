import React, { Component } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
//var StyleSheet = require('react-native-debug-stylesheet');
import Icon2 from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native'
import { observable } from 'mobx'

@inject("appStore") @observer
export default class EditAboutScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { about: this.props.appStore.authStore.about };
	}

	render() {
		const {authStore} = this.props.appStore
		return (
			<View style={styles.container}>
				<TextInput placeholder="Hakkımda" style={styles.about}
					autoFocus={true} multiline={true}
					value={this.state.about}
					onChangeText={(value) => this.setState({about: value})}/>
				<Icon2.Button name='md-checkmark' style={styles.save}
				onPress={ () => authStore.updateAbout(this.state.about)} >
					<Text style={styles.saveText}>Kaydet</Text>
				</Icon2.Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20
	},
	about: {
		marginTop: 10,
		marginBottom: 15,
		alignSelf: 'stretch',
		backgroundColor: 'white',
		height: 100,
	},
	saveText: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 3,
	}
});
