import React, {Component} from 'react'
import {Picker, View, StyleSheet} from 'react-native'
import universities from "../../utils/universities"
import { observer, inject } from 'mobx-react/native'
//var StyleSheet = require('react-native-debug-stylesheet');

const Item = Picker.Item

@inject("appStore") @observer
export default class UniSelector extends Component {
	render(){
		const {cafeStore} = this.props.appStore
		const pickedUniName = universities.filter((item) => item.id === cafeStore.pickedUniId)[0].name

		const uniItems = universities.map(item => <Item label={item.name} color="#333333" value={item.id} key={item.id} /> );

		return (
			<View style={styles.container}>
				<Picker style={styles.picker} mode="dialog"
				selectedValue={cafeStore.pickedUniId}
				onValueChange={(val) => {
					cafeStore.setPickedUniId(val)
					cafeStore.refreshCheckins()
				}}>
					{uniItems}
				</Picker>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		//backgroundColor: '#ccccc1',
		borderColor: 'steelblue',
		borderWidth: 2,
		borderRadius: 20,
		height: 40,
		paddingLeft: 15
	},
	picker: {
		width: 250,
		height: 40,
		color: 'steelblue'
	}
})
