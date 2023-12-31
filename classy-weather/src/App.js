import React from "react";
import { ajax, getWeatherIcon, getFlagEmoji, formatDay } from "./helpers";
import { findDOMNode } from "react-dom";
import { fetchGethWeather } from "./fetchGetWeather";

/// App ///

class App extends React.Component {
  state = {
    location: "",
    error: "",
    weather: {},
    isLoading: false,
    displayLocation: "",
  };

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
        <GetWeather>
          <Input
            onHandleLocation={this.handleLocation}
            location={this.state.location}
            onSetError={this.handleSetError}
            onSetIsLoading={this.handleSetIsLoading}
            onSetWeather={this.handleSetWeather}
            onSetDisplayLocation={this.handleSetDisplayLocation}
            onGetFetch={this.getFetch}
          />
        </GetWeather>

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
  // componentDidUpdate(prevProps) {
  //   if (prevProps.location !== this.props.location) {
  //     fetchGethWeather(this.props);
  //     localStorage.setItem("location", JSON.stringify(this.props.location));
  //   }
  // }

  render() {
    const { children } = this.props;

    return (
      <>
        <h1>Classy Weather</h1>
        {children}
      </>
    );
  }
}

class Input extends React.Component {
  componentDidMount() {
    const storedItem = localStorage.getItem("location") || "";
    this.props.onHandleLocation(storedItem);

    fetchGethWeather(this.props, storedItem);
  }

  handleFetchWeather = (location) => {
    this.props.onHandleLocation(location);
    console.log(location);
    fetchGethWeather(this.props, location);
    localStorage.setItem("location", location);
  };

  render() {
    const { error, isLoading, location } = this.props;
    return (
      <div className="input-container">
        <input
          type="text"
          placeholder="Your location..."
          value={location}
          onChange={(e) => this.handleFetchWeather(e.target.value)}
        ></input>
        {isLoading && <p className="loading">Is loading...</p>}
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

////// WeatherDisplay /////

class WeatherDisplay extends React.Component {
  componentWillUnmount() {
    console.log("Weather is unmounting");
  }

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
