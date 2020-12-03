//Fetch all countries details
async function fetchCountriesDetails() {
    try {
        let countries = await fetch("https://restcountries.eu/rest/v2/all");
        let countriesJson = await countries.json();
        displayCountryDataInCards(countriesJson);
    } catch (err) {
        console.error(err);
    }
}

//Fetch weather details for a particular state ,country 
async function fetchWeatherDetails(state, country) {
    try {
        let weatherApiId = '444c619e09f729569614aeca5949eb2f';
        let weatherDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state},${country}&appid=${weatherApiId}`);
        let weatherDetailsJson = await weatherDetails.json();
        displayWeatherDetailsInModal(weatherDetailsJson, country);
    } catch (err) {
        console.error(err);
    }
}

//Creating a dom element with properties elem, class,name and id. 
function createDomElement(elem, elemClass = '', elemName = '', elemId = '') {
    let element = document.createElement(elem);
    (elemClass !== '') && element.setAttribute('class', elemClass);
    (elemName !== '') && element.setAttribute('name', elemName);
    (elemId !== '') && element.setAttribute('id', elemId);
    return element;
}

//Create cards for country data and display them.
function displayCountryDataInCards(countries) {
    let containerForCountryDetails = createDomElement('div', 'country-data-container')
    countries.forEach(country => {
        containerForCountryDetails.append(createSingleCardForCountry(country));
    });
    document.body.append(createHeaderForCountryDetails(), containerForCountryDetails);
}

//create single card for country 
function createSingleCardForCountry(country) {
    let cardContainerForCountries = createDomElement('div', 'card');
    let cardContainerForCountryName = createDomElement('div', 'title');
    cardContainerForCountryName.innerText = country.name;

    let imgContainerForCountryFlag = createDomElement('img', 'card-img-top');
    imgContainerForCountryFlag.setAttribute('src', country.flag);

    let cardBodyForCountryDetails = createDomElement('div', 'card-body');

    let containerForCountryCapital = createDomElement('h5', 'card-text');
    containerForCountryCapital.innerHTML = `Capital : ${(country.capital === '' ? 'N/A' : country.capital)}`;

    let containerForCountryCodes = createDomElement('h5', 'card-text');
    containerForCountryCodes.innerHTML = `Country Codes : ${country.alpha2Code}, ${country.alpha3Code}`;

    let containerForCountryRegion = createDomElement('h5', 'card-text');
    containerForCountryRegion.innerHTML = `Region : ${country.region}`;

    let containerForCountryLatLng = createDomElement('h5', 'card-text');
    containerForCountryLatLng.innerHTML = `LatLng : ${country.latlng[0]}, ${country.latlng[1]}`;

    let containerForCountryCurrency = createDomElement('h5', 'card-text');
    containerForCountryCurrency.innerHTML = `Currency Code : ${country.currencies[0].code}`;

    let fetchWeatherDetailsBtn = createDomElement('div', 'fetch-weather-details-btn');
    fetchWeatherDetailsBtn.innerHTML = `Weather Details`;
    fetchWeatherDetailsBtn.state = `${country.capital}`;
    fetchWeatherDetailsBtn.country = `${country.name}`;
    fetchWeatherDetailsBtn.addEventListener('click', (event) => fetchWeatherDetails(event.currentTarget.state, event.currentTarget.country));

    cardBodyForCountryDetails.append(containerForCountryCapital, containerForCountryCodes, containerForCountryRegion, containerForCountryLatLng, containerForCountryCurrency, fetchWeatherDetailsBtn);
    cardContainerForCountries.append(cardContainerForCountryName, imgContainerForCountryFlag, cardBodyForCountryDetails);
    return cardContainerForCountries;
}

//Creating the header for the country details
function createHeaderForCountryDetails() {
    let countryDataHeader = createDomElement('div', 'country-data-header');
    countryDataHeader.innerText = `Country Details`;
    return countryDataHeader;
}

//Display Weather Details in modal.
function displayWeatherDetailsInModal(weatherDetails, country) {
    let modal = createDomElement('div', 'modal-container');

    let containerForWeatherDetails = createDomElement('div', 'weather-details-container');

    let closeModalBtn = createDomElement('div', 'close-modal-btn');
    closeModalBtn.innerHTML = '<i class="fa fa-close"></i>';
    closeModalBtn.addEventListener('click', clearAndCloseModal);

    let countryContainer = createDomElement('div', 'country-content');
    countryContainer.innerHTML = country;

    let weatherDescription = createDomElement('div', 'weather-description');
    weatherDescription.innerHTML = `<b>Weather</b> : ${weatherDetails.weather[0].description}`;

    let weatherWindSpeed = createDomElement('div', 'weather-wind-speed');
    weatherWindSpeed.innerHTML = `<b>Wind Speed</b> : ${weatherDetails.wind.speed}`;

    let weatherHumidity = createDomElement('div', 'weather-humidity');
    weatherHumidity.innerHTML = `<b>Humidity</b> : ${weatherDetails.main.humidity}%`;

    let weatherTemperature = createDomElement('div', 'weather-temperature');
    weatherTemperature.innerHTML = `<b>Temperature</b> : ${converTempFromKelvinToCelsius(weatherDetails.main.temp)} degree Celsius`;

    let weatherPressure = createDomElement('div', 'weather-pressure');
    weatherPressure.innerHTML = `<b>Pressure</b> : ${weatherDetails.main.pressure}`;

    containerForWeatherDetails.append(countryContainer, weatherDescription, weatherWindSpeed, weatherHumidity, weatherTemperature, weatherPressure, closeModalBtn);
    modal.append(containerForWeatherDetails)
    document.body.append(modal);
}

//Convert temperatur from kelvin to celsius.
function convertTempFromKelvinToCelsius(tempInKelvin) {
    return (tempInKelvin - 273).toFixed(2);
}

//Clear modal data and close modal.
function removeAndCloseModal() {
    document.querySelector('.modal-container').remove();
}

fetchCountriesDetails();
