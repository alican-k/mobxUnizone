import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
import {autorun} from 'mobx'
import AppStore from './store/store'
import RootNavigator from './RootNavigator'
import codePush from "react-native-code-push"

// import {enableLogging} from 'mobx-logger';
// const config = {};
// enableLogging(/*config*/);

let nav
//const appStore = new AppStore()

class App extends Component{
	appStore = null

	componentWillMount(){
		this.appStore = new AppStore()
	}
	render(){
		return (
			<Provider appStore={this.appStore}>
				<RootNavigator ref={n => nav = n} />
			</Provider>
		)
	}
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

export default codePush(codePushOptions)(App);
export {nav}




/*
<RootNavigator ref={n => nav = n} onNavigationStateChange={
	(prevState, newState) => {
		console.log('prevState:', prevState);
		console.log('newState:', newState);
	}
}/>
*/
