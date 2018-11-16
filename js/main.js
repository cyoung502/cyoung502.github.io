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

function setStage(){
	document.getElementById("background").setAttribute("style", "background-image: url(" + w.background + ")");
	document.getElementById("overlay").setAttribute("style", "background-image: url(" + w.overlay + ")");
}

function setToday(){
	document.getElementById("sunrise").innerHTML = w.weatherData.astronomy.sunrise;
	document.getElementById("sunset").innerHTML = w.weatherData.astronomy.sunset;
	document.getElementById("humidity").innerHTML = w.weatherData.atmosphere.humidity + " " + "%";
	document.getElementById("pressure").innerHTML = w.weatherData.atmosphere.pressure + " " + w.weatherData.units.pressure;
	document.getElementById("visibility").innerHTML = w.weatherData.atmosphere.visibility + " " + w.weatherData.units.distance;
	document.getElementById("temperature").innerHTML = w.weatherData.item.condition.temp + "&deg; " + w.weatherData.units.temperature;
	document.getElementById("condition").innerHTML = w.weatherData.item.condition.text;
	document.getElementById("chill").innerHTML = w.weatherData.wind.chill + " " + w.weatherData.units.temperature;
	document.getElementById("direction").innerHTML = w.weatherData.wind.direction;
	document.getElementById("speed").innerHTML = w.weatherData.wind.speed + " " + w.weatherData.units.speed;
	document.getElementById("latitude").innerHTML = w.weatherData.item.lat + "&deg;";
	document.getElementById("longitude").innerHTML = w.weatherData.item.long + "&deg;";
	document.getElementById("date").innerHTML = w.weatherData.item.forecast[0].day + ", " + w.weatherData.item.forecast[0].date;
	document.getElementById("location").innerHTML = w.city;	
}

function setForecast(){
	let table = document.getElementById("forecast");
	let thead = table.appendChild(document.createElement("thead"));
	let tr = thead.appendChild(document.createElement("tr"));
	for(let i = 0; i < 10; i++){
		let td = document.createElement("td");
		td.innerHTML = w.weatherData.item.forecast[i].day;
		tr.appendChild(td);
	}
	let tbody = table.appendChild(document.createElement("tbody"));
	tr = tbody.appendChild(document.createElement("tr"));
	for(let i = 0; i < 10; i++){
		let td = document.createElement("td");
		td.innerHTML = "<div class=\"small\">" + w.weatherData.item.forecast[i].text + "</div>" + "<br>"
		+ "High: " + w.weatherData.item.forecast[i].high + "<br>"
		+ "Low: " + w.weatherData.item.forecast[i].low;
		tr.appendChild(td);
	}
}

function getData(){
	getCity(getWeatherData);
}


window.onload = function(){
	getData();
}