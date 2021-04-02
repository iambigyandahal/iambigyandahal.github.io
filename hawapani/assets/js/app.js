if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then((reg) => console.log("Service worker registered!", reg))
	.catch((err) => console.log("Service worker not registered!"))
}

const app = Vue.createApp({
	data() {
		return {
			title: "Hawapani",
			loc: '',
			weather: {},
			dateNow: ''
		}
	},
	methods: {
		getWeatherData(e) {
			if(e.key == "Enter") {
				this.dateNow = new Date(Date.now()).toDateString();
				//https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&APPID=998bc6f482f2f7431cc4378e95eb69a5
				fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.loc}&units=metric&APPID=998bc6f482f2f7431cc4378e95eb69a5`)
				.then(res => {
					return res.json()
				})
				.then(this.setResults)
			}
		},
		setResults(results) {
			this.weather = results
		}
	}
})

app.mount('#app')