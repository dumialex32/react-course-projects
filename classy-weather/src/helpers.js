const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Data fetching took more than ${s} seconds`));
    }, s * 1000);
  });
};

export function getWeatherIcon(wmoCode) {
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

export function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

export function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export const ajax = async function (url, dataObj = undefined) {
  try {
    const fetchPro = dataObj
      ? await fetch(url, {
          method: "POST",
          body: JSON.stringify(dataObj),
          headers: {
            "Content-Type": "application/json",
          },
        })
      : fetch(url);

    const res = await Promise.race([timeout(3), fetchPro]);

    if (!res.ok) throw new Error("A problem during fetching has occured");

    const data = await res.json();

    if (!data) throw new Error("No data has been found");
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
