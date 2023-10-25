import React from "react";
import { ajax } from "./helpers";
import { findDOMNode } from "react-dom";

function getWeatherIcon(wmoCode) {
  console.log(wmoCode);
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);

  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));

  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData.daily);
  } catch (err) {
    console.err(err);
  }
}

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

        <Weather weather={this.state.weather} />
      </div>
    );
  }
}

export default App;

class GetWeather extends React.Component {
  fetchWeather = async (location) => {
    const { onSetError, onSetIsLoading, onSetWeather, onSetDisplayLocation } =
      this.props;
    if (!location || location.length <= 1) return;
    try {
      onSetIsLoading(true);
      onSetError("");

      // Getting the geolocation

      const geoFetch = await ajax(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );

      if (!geoFetch.results) throw new Error("Wrong input");

      const {
        country_code: countryCode,
        latitude: lat,
        longitude: lng,
        name,
        timezone,
      } = geoFetch.results.at(0);

      onSetDisplayLocation(`${name} ${convertToFlag(countryCode)}`);

      // Getting the weather forecast

      const weatherData = await ajax(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      console.log(weatherData.daily);

      onSetWeather(weatherData.daily);

      onSetIsLoading(false);
    } catch (err) {
      console.dir(err);
      console.error(err);
      onSetError(err.message);
    } finally {
      onSetIsLoading(false);
    }
  };

  render() {
    console.log(this.props);
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
        <button onClick={() => this.fetchWeather(location)}>
          GET WEATHERrrr
        </button>
      </>
    );
  }
}

class Weather extends React.Component {
  render() {
    const { weather } = this.props;
    console.log(weather);

    console.log(weather);
    return (
      <div className="weather-list">
        <h3>Weather City</h3>
        <ul className="list">
          <li>Weather</li>
        </ul>
      </div>
    );
  }
}
