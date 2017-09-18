import { observable, computed, autorun, action } from 'mobx'
import fir from '../firebase'
import foursquare from '../foursquare'

export default class CheckinStore {
	constructor(appStore){
		this.appStore = appStore
		this.watchLocation()
		this.searchWhenNecessary()
	}

	@observable location = { longitude: null, latitude: null }
	@computed get isLocation() { return Boolean(this.location.longitude && this.location.latitude)}

	@observable venues = []
	@observable venuesStatus = 'VENUES_NOT_EXPECTED'			// 'VENUES_EXPECTED' 'VENUES_LOADING' 'VENUES_LOADED'
	@computed get isSearchNecessary () { return this.isLocation && this.venuesStatus === 'VENUES_EXPECTED' }

	@observable selectedVenueIndex = null

	watchLocationId = null

	appStore = null

	watchLocation(){
		const successFunc = (position) => {
			//console.log('location alındı: ', position);
			this.updateLocation(position.coords.longitude, position.coords.latitude)
		}
		const errorFunc = (error) => {
			//console.error(error)
		}
		//const config = { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000 }
		//const config = { enableHighAccuracy: true, maximumAge: 20000 }
		//navigator.geolocation.getCurrentPosition(successFunc, errorFunc, config);
		navigator.geolocation.getCurrentPosition(successFunc, errorFunc, {});
		//watchLocationId = navigator.geolocation.watchPosition(successFunc, errorFunc, config);
		watchLocationId = navigator.geolocation.watchPosition(successFunc, errorFunc, {});
	}

	dispose = null
	searchWhenNecessary(){
		this.dispose = autorun('search venue autorun', () => {
			if (this.isSearchNecessary) {
				this.searchVenues()
			}
		})
	}

	@action updateLocation(longitude, latitude){
		this.location = {longitude, latitude}
	}
	@action updateVenuesStatus(status){
		this.venuesStatus = status
		if (status === 'VENUES_NOT_EXPECTED') {
			//this.dispose()
		}
	}
	@action searchVenues(){
		const params = {
			"ll": this.location.latitude + ', ' + this.location.longitude
			//"ll": "38.404895, 27.119901",
			//"query": "nargile"
		};

		this.updateVenuesStatus('VENUES_LOADING')
		this.selectedVenueIndex = null

		foursquare.venues.getVenues(params)
		.then(action('actionVenuesLoaded',
			(r) => {
				this.venues = r.response.venues.map((venue) => {

					let {id, name, categories, location} = venue
					let {distance, lat:latitude, lng:longitude, formattedAddress, city} = location

					let category = categories.length ? categories[0].name : ''
					let address = formattedAddress.length ? formattedAddress[0] : ''

					return {id, name, category, address, latitude, longitude, city, distance, selected: false}
				})
				this.venuesStatus = 'VENUES_LOADED'
			}))
		.catch( error => {
			//console.error(error)
		})
	}
	@action selectVenue(idx){
		if (this.selectedVenueIndex) {
			this.venues[this.selectedVenueIndex].selected = false
		}
		//console.log(this.venues[idx]);
		this.venues[idx].selected = true
		this.selectedVenueIndex = idx
	}
	checkin(){
		let {id: frsqrId, name,category='',address='',latitude='',longitude='', city=''} = this.venues[this.selectedVenueIndex]
		let data = {frsqrId, name, category, address, latitude, longitude, city}
		this.appStore.cafeStore.checkin(data)
	}
}
