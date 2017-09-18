import React, { Component } from 'react';
import { Button, View, Text, TextInput, ListView, ScrollView, StyleSheet } from 'react-native';

import { observer, inject } from 'mobx-react/native'

@inject("appStore") @observer
export default class AnnouncementsScreen extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}).cloneWithRows([
				'Ev Arkadaşı - Kafa dengini bul',
				'Aktivite, Eğlence - Spor arkadaşı, parti, ortamlar..',
				'Ders Notu, Ödev - Ön sırada oturan arkadaşlara ulaş!',
				'Özel Ders - Ders verip para bile kazanabilirsin veya tam tersi..',
				'Organizasyon - Konserler, geziler, duyurular..',
				'2. El Eşya - Ne ihtiyacın varsa al-sat!',
				'Kayıp Eşya - Kaybettiğin veya bulduğun şeyleri duyur',
			]),
		}
	}

	renderRow(data) {
		return (
			<Text style={styles.items}>{`${data}`}</Text> // \u2022
		)
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.title}>İlanlar, çok yakında..</Text>
				<ListView
				style={{margin: 10}}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		marginTop: 15,
        fontSize: 18,
        color: "#222222",
		//backgroundColor: 'white',
		textAlign: 'center',
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderRadius: 8,
	},
	items: {
		textAlign: 'center',
		marginTop: 26,
		fontSize: 16,
		//fontWeight: 'bold',
		//backgroundColor: '#cccccc'
	}
});
