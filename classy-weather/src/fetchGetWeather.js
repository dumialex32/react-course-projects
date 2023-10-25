import { ajax, getFlagEmoji } from "./helpers";

export const fetchGethWeather = async (location, props) => {
  const { onSetError, onSetIsLoading, onSetWeather, onSetDisplayLocation } =
    props;
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

    onSetDisplayLocation(`${name} ${getFlagEmoji(countryCode)}`);

    // Getting the weather forecast

    const weatherData = await ajax(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );

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
