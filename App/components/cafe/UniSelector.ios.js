import React, {Component} from 'react'
import {Button, Text, Picker, StyleSheet, View} from 'react-native'
import Modal from 'react-native-root-modal'
import Icon from 'react-native-vector-icons/FontAwesome';
import universities from "../../utils/universities"
import { observer, inject } from 'mobx-react/native'
//var StyleSheet = require('react-native-debug-stylesheet');

const Item = Picker.Item

@inject("appStore") @observer
export default class UniSelector extends Component {
	isUniUpdated = false

	render(){
		const {cafeStore} = this.props.appStore
		const pickedUniName = universities.filter((item) => item.id === cafeStore.pickedUniId)[0].name

		const uniItems = universities.map(item => <Item label={item.name} color="#333333" value={item.id} key={item.id} />)

		return (
			<View style={styles.container}>
				<Modal style={styles.modal}
				visible={cafeStore.uniSelectorShown}>
					<Picker style={styles.picker} mode="dialog"
						selectedValue={cafeStore.pickedUniId}
						onValueChange={(val) => {
							this.isUniUpdated = true
							cafeStore.setPickedUniId(val)
						}} >
						{uniItems}
					</Picker>
					<Button title='kapat' onPress={() => {
						cafeStore.setUniSelectorShown(false)
						if (this.isUniUpdated) {
							cafeStore.refreshCheckins()
						}
						this.isUniUpdated = false
					}} />
				</Modal>
				<Icon.Button name='sort-down'
					style={styles.selectorButton}
					backgroundColor = 'grey'
					onPress = { () => cafeStore.setUniSelectorShown(true) } >
					{pickedUniName}
				</Icon.Button>
			</View>


		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		alignItems:'center'
	},
	modal: {
		top: 0,
        right: 0,
        bottom: 0,
        left: 0,
		backgroundColor: 'white',
	},
	selectorButton: {
	},
	picker: {
		alignSelf: 'stretch'
	}
})
