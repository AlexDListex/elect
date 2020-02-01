const cityForm = document.querySelector("#weatherForm");

//key - 3e0de29fa3293d6a4da8080d20084ae6

const getWeatherConditions = async(city) => {
    await fetch(`http://api.weatherstack.com/current?access_key=3e0de29fa3293d6a4da8080d20084ae6&query=${city}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let div = document.createElement("div");
            div.setAttribute("id", "conditions");
            let img = document.createElement("img");
            img.setAttribute("src", data.current.weather_icons[0]);
            img.setAttribute("loading", "lazy");

            let weatherDesc = document.createElement("h4");
            let weatherDescNode = document.createTextNode(data.current.weather_descriptions[0]);
            weatherDesc.appendChild(weatherDescNode);

            let city = document.createElement("h2");
            let cityNode = document.createTextNode(data.request.query);
            city.appendChild(cityNode);

            let temp = document.createElement("div");
            let tempNode = document.createTextNode("Real temp " + data.current.temperature + " C");
            temp.appendChild(tempNode);

            let tempFeelsLike = document.createElement("div");
            let tempFeelsLikeNode = document.createTextNode("Feels like " + data.current.feelslike + " C");
            tempFeelsLike.appendChild(tempFeelsLikeNode);

            div.appendChild(img);
            div.appendChild(weatherDesc);
            div.appendChild(city);
            div.appendChild(temp);
            div.appendChild(tempFeelsLike);

            document.querySelector("main").appendChild(div);
        }).catch(err => console.log(err))
};

document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (document.querySelector("#city") !== ""){
            let conditionsDiv = document.querySelector("#conditions");
            if (conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        } else {
            console.log("Please, provide a city");
        }
    })
});