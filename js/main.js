var w;
let city, weatherData;

function getCity(callback){
	$.ajax({
		url: "https://ipapi.co/json",
		dataType: "json",
		cache: false,
		success: function(result){
			city = result.city + ", " + result.region;
			let weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json";
			callback(weatherUrl);
		}
	});

}

function getWeatherData(weatherUrl){
	$.ajax({
		url: weatherUrl,
		dataType: 'jsonp',
		cache: false,
		success: function(result){
			weatherData = result.query.results.channel;
			w = new Weather(city, weatherData);
			w.init();
			setStage();
			setToday();
			setForecast();
		}
	});
}

function showDetails(){
	let details = document.getElementById("details")
	let brainlet = document.getElementById("brainlet");
	let btn = document.getElementById("btn-details");
	if(details.classList.contains("d-none")){
		btn.innerHTML = "Close";
	} else {
		btn.innerHTML = "Show Details";
	}
	details.classList.toggle("d-none");
	brainlet.classList.toggle("d-none");
}

function setStage(){
	document.getElementById("background").setAttribute("style", "background-image: url(" + w.background + ")");
	document.getElementById("overlay").setAttribute("style", "background-image: url(" + w.overlay + ")");
}

function setToday(){
	function fixTime(time){
		if(time < "10"){
			return "0" + time;
		} else {
			return time;
		}
	}
	let node = document.getElementById("direction").parentNode;
	let icon = document.createElement("i");
	icon.classList.add("wi", "wi-wind", "from-" + w.weatherData.wind.direction + "-deg", "display-5", "mr-2");
	node.insertBefore(icon, node.childNodes[5]);
	node = document.getElementById("condition").parentNode;
	icon = document.createElement("i");
	icon.classList.add("wi", getIconClass(w.weatherData.item.condition.code), "display-4", "mr-2");
	node.insertBefore(icon, node.childNodes[2]);
	document.getElementById("sunrise").innerHTML = w.weatherData.astronomy.sunrise;
	document.getElementById("sunset").innerHTML = w.weatherData.astronomy.sunset;
	document.getElementById("humidity").innerHTML = w.weatherData.atmosphere.humidity + "%";
	document.getElementById("pressure").innerHTML = w.weatherData.atmosphere.pressure + " " + w.weatherData.units.pressure;
	document.getElementById("visibility").innerHTML = w.weatherData.atmosphere.visibility + " " + w.weatherData.units.distance;
	document.getElementById("temperature").innerHTML = w.weatherData.item.condition.temp + "&deg; " + w.weatherData.units.temperature;
	document.getElementById("condition").innerHTML = w.weatherData.item.condition.text;
	document.getElementById("chill").innerHTML = w.weatherData.wind.chill + "&deg;" + w.weatherData.units.temperature;
	document.getElementById("direction").innerHTML = w.weatherData.wind.direction + "&deg;";
	document.getElementById("speed").innerHTML = w.weatherData.wind.speed + " " + w.weatherData.units.speed;
	document.getElementById("latitude").innerHTML = w.weatherData.item.lat + "&deg;";
	document.getElementById("longitude").innerHTML = w.weatherData.item.long + "&deg;";
	document.getElementById("date").innerHTML = w.weatherData.item.forecast[0].day + ", " + w.weatherData.item.forecast[0].date;
	document.getElementById("location").innerHTML = w.city;	
	let d = new Date();
	let h = fixTime(d.getHours());
	let m = fixTime(d.getMinutes());
	let s = fixTime(d.getSeconds());
	document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
}

function setForecast(){
	let days = w.weatherData.item.forecast.length;
	let table = document.getElementById("forecast");
	let thead = table.appendChild(document.createElement("thead"));
	thead.classList.add("text-center", "bg-secondary");
	let tr = thead.appendChild(document.createElement("tr"));
	for(let i = 0; i < days; i++){
		let td = document.createElement("td");
		td.innerHTML = w.weatherData.item.forecast[i].day;
		tr.appendChild(td);
	}
	let tbody = table.appendChild(document.createElement("tbody"));
	tr = tbody.appendChild(document.createElement("tr"));
	tr.classList.add("text-center");
	for(let i = 0; i < days; i++){
		let td = document.createElement("td");
		td.innerHTML = "<i class=\"mt-3 mb-1 wi " + getIconClass(w.weatherData.item.forecast[i].code) + "\"></i>";
		tr.appendChild(td);
	}
	tr = tbody.appendChild(document.createElement("tr"));
	tr.classList.add("text-center");
	for(let i = 0; i < days; i++){
		let td = document.createElement("td");
		td.innerHTML = "<div class=\"small\">" + w.weatherData.item.forecast[i].text + "</div>";
		tr.appendChild(td);
	}
	tr = tbody.appendChild(document.createElement("tr"));
	tr.classList.add("text-center");
	for(let i = 0; i < days; i++){
		let td = document.createElement("td"); 
		td.innerHTML = w.weatherData.item.forecast[i].high + "&deg;" + w.weatherData.units.temperature + " / "
		+ w.weatherData.item.forecast[i].low + "&deg;" + w.weatherData.units.temperature;
		tr.appendChild(td);
	}
}

function getIconClass(weatherCode){
	let icon;
	switch(weatherCode){
		case "0":
			icon = "wi-tornado";
			break;
		case "1":
			icon = "wi-hurricane-warning";
			break;
		case "2":
			icon = "wi-hurricane";
			break;
		case "3":
		case "4":
		case "37":
		case "38":
			icon = "wi-thunderstorm";
			break;
		case "5":
		case "6":
		case "7":
		case "35":
		case "46":
			icon = "wi-rain-mix";
			break;
		case "8":
		case "10":
		case "18":
			icon = "wi-sleet";
			break;
		case 9:
			icon = "wi-sprinkle";
			break;
		case "11":
		case "12":
		case "39":
		case "40":
			icon = "wi-showers";
			break;
		case "13":
		case "14":
		case "15":
		case "16":
			icon = "wi-snow";
			break;
		case "17":
			icon = "wi-hail";
			break;
		case "19":
			icon = "wi-dust";
			break;
		case "20":
			icon = "wi-fog";
			break;
		case "21":
			icon = "wi-day-haze";
			break;
		case "23":
			icon = "wi-strong-wind";
			break;
		case "24":
			icon = "wi-windy";
			break;
		case "25":
			icon = "wi-snowflake-cold";
			break;
		case "26":
			icon = "wi-day-sunny-overcast";
			break;
		case "27":
		case "29":
			icon = "wi-night-alt-cloudy";
			break;
		case "28":
			icon = "wi-cloudy";
			break;
		case "30":
			icon = "wi-day-cloudy";
			break;
		case "31":
			icon = "wi-night-clear";
			break;
		case "32":
			icon = "wi-day-sunny";
			break;
		case "33":
			icon = "wi-night-cloudy";
			break;
		case "34":
			icon = "wi-day-haze";
			break;
		case "36":
			icon = "wi-hot";
			break;
		case "41":
		case "42":
		case "43":
			icon = "wi-snow";
			break;
		case "44":
			icon = "wi-cloud";
			break;
		case "45":
		case "47":
			icon = "wi-storm-showers";
			break;
		case "3200":
		default:
			icon = "wi-na";
			break;
	}
	return icon;
}

function getData(){
	getCity(getWeatherData);
}

window.onload = function(){
	getData();
}