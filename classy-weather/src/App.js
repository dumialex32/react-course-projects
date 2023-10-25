import React from "react";
import { ajax, getWeatherIcon, getFlagEmoji, formatDay } from "./helpers";
import { findDOMNode } from "react-dom";
import { fetchGethWeather } from "./fetchGetWeather";

// async function getWeather(location) {
//   try {
//     // 1) Getting location (geocoding)
//     const geoRes = await fetch(
//       `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
//     );
//     const geoData = await geoRes.json();
//     console.log(geoData);

//     if (!geoData.results) throw new Error("Location not found");

//     const { latitude, longitude, timezone, name, country_code } =
//       geoData.results.at(0);
//     console.log(`${name} ${convertToFlag(country_code)}`);

//     // 2) Getting actual weather
//     const weatherRes = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
//     );
//     const weatherData = await weatherRes.json();
//     console.log(weatherData.daily);
//   } catch (err) {
//     console.err(err);
//   }
// }

/////////////////// App ///////////////////////

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      location: "",
      error: "",
      weather: {},
      isLoading: false,
      displayLocation: "",
    };
  }

  handleLocation = (locData) => {
    this.setState({ location: locData });
  };

  handleSetError = (errMsg) => {
    this.setState({ error: errMsg });
  };
  handleSetWeather = (weatherData) => {
    this.setState({ weather: weatherData });
  };
  handleSetIsLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  };
  handleSetDisplayLocation = (displayLocData) => {
    this.setState({ displayLocation: displayLocData });
  };

  render() {
    return (
      <div className="app">
        <GetWeather
          onHandleLocation={this.handleLocation}
          location={this.state.location}
          error={this.state.error}
          isLoading={this.state.isLoading}
          onSetError={this.handleSetError}
          onSetIsLoading={this.handleSetIsLoading}
          onSetWeather={this.handleSetWeather}
          onSetDisplayLocation={this.handleSetDisplayLocation}
        />

        <Weather
          weather={this.state.weather}
          displayLocation={this.state.displayLocation}
        />
      </div>
    );
  }
}

export default App;

class GetWeather extends React.Component {
  getWeather = (location) => {
    fetchGethWeather(location, this.props);
  };

  render() {
    const { onHandleLocation, location, error, isLoading } = this.props;

    return (
      <>
        <h1>Classy Weather</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Your location..."
            value={location}
            onChange={(e) => onHandleLocation(e.target.value)}
          ></input>
          {isLoading && <p className="loading">Is loading...</p>}
          {error && <p className="error">{error}</p>}
        </div>
        <button onClick={() => this.getWeather(location)}>GET WEATHER</button>
      </>
    );
  }
}

class Weather extends React.Component {
  render() {
    const { weather, displayLocation } = this.props;
    console.log(weather);
    console.log(displayLocation);

    return (
      <div className="weather-list">
        <h3>Weather {displayLocation}</h3>
        <ul className="list">
          <li>Weather</li>
        </ul>
      </div>
    );
  }
}
