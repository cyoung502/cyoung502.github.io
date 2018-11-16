let imageExtension = ".png";

function Weather(city, weatherData){
	this.city = city;
	this.weatherData = weatherData;
	this.background = "images/background/";
	this.overlay = "images/overlay/";
	this.status = "images/status/";
}

Weather.prototype.setOverlay = function(image){
	this.overlay = this.overlay + image + imageExtension;
}

Weather.prototype.setStatus = function(image){
	this.status = this.status + image + imageExtension;
}

Weather.prototype.setBackground = function(){
	let d = new Date();
	let sunrise = this.weatherData.astronomy.sunrise;
	sunrise = parseInt(sunrise.split(":")[0]);
	let sunset = this.weatherData.astronomy.sunset;
	sunset = parseInt(sunset.split(":")[0]) + 12;
	let h = d.getHours();
	if(h >= sunrise && h <= sunset){
		this.background = this.background + "day.jpg";
	} else {
		this.background = this.background + "night.jpg";
	}
}

Weather.prototype.setImages = function(image){
	this.setBackground();
	this.setOverlay(image);
	this.setStatus(image);
}

Weather.prototype.init = function(){
	let weatherCode = this.weatherData.item.condition.code;
	switch(weatherCode) {
		case "0":
			this.setImages("tornado");
			break;
		case "1":
			this.setImages("tropical_storm");
			break;
		case "2":
			this.setImages("hurricane");
			break;
		case "3":
			this.setImages("severe_thunderstorms");
			break;
		case "4":
			this.setImages("thunderstorms");
			break;
		case "5":
			this.setImages("mixed_rain_and_snow");
			break;
		case "6":
			this.setImages("mixed_rain_and_sleet");
			break;
		case "7":
			this.setImages("mixed_snow_and_sleet");
			break;
		case "8":
			this.setImages("freezing_drizzle");
			break;
		case "9":
			this.setImages("drizzle");
			break;
		case "10":
			this.setImages("freezing_rain");
			break;
		case "11":
		case "12":
			this.setImages("showers");
			break;
		case "13":
			this.setImages("snow_flurries");
			break;
		case "14":
			this.setImages("light_snow_showers");
			break;
		case "15":
			this.setImages("blowing_snow");
			break;
		case "16":
			this.setImages("snow");
			break;
		case "17":
			this.setImages("hail");
			break;
		case "18":
			this.setImages("sleet");
			break;
		case "19":
			this.setImages("dust");
			break;
		case "20":
			this.setImages("foggy");
			break;
		case "21":
			this.setImages("haze");
			break;
		case "22":
			this.setImages("smoky");
			break;
		case "23":
			this.setImages("blustery");
			break;
		case "24":
			this.setImages("windy");
			break;
		case "25":
			this.setImages("cold");
			break;
		case "26":
			this.setImages("cloudy");
			break;
		case "27":
			this.setImages("mostly_cloudy_night");
			break;
		case "28":
			this.setImages("mostly_cloudy_day");
			break;
		case "29":
			this.setImages("partly_cloudy_night");
			break;
		case "30":
			this.setImages("partly_cloudy_day");
			break;
		case "31":
			this.setImages("clear_night");
			break;
		case "32":
			this.setImages("sunny");
			break;
		case "33":
			this.setImages("fair_night");
			break;
		case "34":
			this.setImages("fair_day");
			break;
		case "35":
			this.setImages("mixed_rain_and_hail");
			break;
		case "36":
			this.setImages("hot");
			break;
		case "37":
			this.setImages("isolated_thunderstorms");
			break;
		case "38":
		case "39":
			this.setImages("scattered_thunderstorms");
			break;
		case "40":
			this.setImages("scattered_showers");
			break;
		case "41":
			this.setImages("heavy_snow");
			break;
		case "42":
			this.setImages("scattered_snow_showers");
			break;
		case "43":
			this.setImages("heavy_snow");
			break;
		case "44":
			this.setImages("partly_cloudy");
			break;
		case "45":
			this.setImages("thundershowers");
			break;
		case "46":
			this.setImages("snow_showers");
			break;
		case "47":
			this.setImages("isolated_thundershowers");
			break;
		case "3200":
			this.setImages("reeee");
			break;
	}
}