import React, { Component } from 'react';
import {Text, View} from 'react-native'

import { StackNavigator, TabNavigator, TabView } from "react-navigation";
import { observer, inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './components/auth/LoginScreen'
import SetProfileScreen from './components/auth/SetProfileScreen'
import CafeScreen from './components/cafe/CafeScreen'
import AnnouncementsScreen from './components/announcement/AnnouncementsScreen'
import ProfileScreen from './components/profile/ProfileScreen'
import ConversationsScreen from './components/conversations/ConversationsScreen.js'
import ConversationScreen from './components/conversations/conversation/ConversationScreen.js'
import EditAboutScreen from './components/profile/EditAboutScreen.js'
import CheckinScreen from './components/cafe/checkin/CheckinScreen'
import CheckinHeader from './components/cafe/checkin/CheckinHeader'
import CheckinTitle from './components/cafe/checkin/CheckinTitle'
import ConversationHeader from './components/conversations/conversation/ConversationHeader'
import MessageTabIcon from './components/conversations/MessageTabIcon'

export default RootNavigator = StackNavigator(
	{
	    Login: { screen: LoginScreen, navigationOptions: { header: { visible: false } } },
		SetProfile: { screen: SetProfileScreen, navigationOptions: {
			header: { title: 'Üniversiteni Seç' }
		} },
		EditAbout: { screen: EditAboutScreen, navigationOptions: { header: { title: 'Hakkımda' } }  },
		Checkin: { screen: CheckinScreen, navigationOptions: {
			header: {
				title: (<CheckinTitle />),
				right: (<CheckinHeader/>)
			}
		}},
		Conversation: { screen: ConversationScreen, navigationOptions: {
			//headerTitle: (<ConversationHeader />),
			header: {
				title: (<ConversationHeader />),
			}
		} },
	    MainTabs: {
	        screen: TabNavigator(
	            {
	                Cafe: {
						screen: CafeScreen,
						navigationOptions: {
							tabBar: ({ state, setParams }) =>({
								label: 'Cafe',
								icon: ({ tintColor }) => (
									<Icon name='coffee' color={tintColor} size={20}/>
								),
							}),
						}
					},
					Conversations: {
						screen: ConversationsScreen,
						navigationOptions: {
							tabBar: ({ state, setParams }) =>({
								label: 'Mesaj',
								icon: ({ tintColor }) => (
									<MessageTabIcon tintColor={tintColor}/>
								),
								// icon: ({ tintColor }) => (
								// 	<Icon name='comments-o' color={tintColor} size={20}/>
								// ),
							}),
						}
					},
					Announcements: {
						screen: AnnouncementsScreen,
						navigationOptions: {
							tabBar: ({ state, setParams }) =>({
								label: 'İlanlar',
								icon: ({ tintColor }) => (
									<Icon name='bullhorn' color={tintColor} size={20}/>
								),
							}),
						}
					},
				    Profile: {
						screen: ProfileScreen,
						navigationOptions: {
							tabBar: ({ state, setParams }) =>({
								label: 'Profil',
								icon: ({ tintColor }) => (
									<Icon name='user' color={tintColor} size={20}/>
								),
							}),
						}
					}
	            },
	            {
	                //swipeEnabled: false,
					navigationOptions: {
						header: {
							visible: false,
						},
					},
	                tabBarOptions: {
	                    showIcon: true,
	                    labelStyle: { fontSize: 11, fontWeight: "bold" }
	                }
	            }
	        )
	    },
	},
	{
		headerMode: 'screen',
		header: { visible: false }
	}
);
