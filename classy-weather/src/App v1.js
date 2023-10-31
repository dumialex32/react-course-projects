import React from "react";
import { ajax, getWeatherIcon, getFlagEmoji, formatDay } from "./helpers";
import { findDOMNode } from "react-dom";
import { fetchGethWeather } from "./fetchGetWeather";

/// App ///

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
        ></GetWeather>

        {this.state.weather.weathercode && (
          <WeatherDisplay displayLocation={this.state.displayLocation}>
            {this.state.weather.time.map((date, i) => (
              <Weather
                key={i}
                date={date}
                maxTemp={this.state.weather.temperature_2m_max.at(i)}
                minTemp={this.state.weather.temperature_2m_min.at(i)}
                weathercode={this.state.weather.weathercode.at(i)}
                isToday={i === 0}
              />
            ))}
          </WeatherDisplay>
        )}
      </div>
    );
  }
}

////// GetWeather /////

class GetWeather extends React.Component {
  getWeather = (location) => {
    fetchGethWeather(location, this.props);
  };

  render() {
    const { onHandleLocation, location, error, isLoading, children } =
      this.props;

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

////// WeatherDisplay /////

class WeatherDisplay extends React.Component {
  render() {
    const { displayLocation } = this.props;

    return (
      <div className="weather-list">
        <h3>{displayLocation}</h3>
        <ul className="list">{this.props.children}</ul>
      </div>
    );
  }
}

///// Weather /////

class Weather extends React.Component {
  render() {
    const { date, maxTemp, minTemp, weathercode, isToday } = this.props;
    console.log(date, isToday);

    return (
      <li className="list-item">
        <p>{getWeatherIcon(weathercode)}</p>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          <span>{maxTemp}</span> - <strong>{minTemp}°</strong>
        </p>
      </li>
    );
  }
}

export default App;
