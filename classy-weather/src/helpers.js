const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Data fetching took more than ${s} seconds`));
    }, s * 1000);
  });
};

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

    const res = await Promise.race([timeout(0.5), fetchPro]);

    if (!res.ok) throw new Error("A problem during fetching has occured");

    const data = await res.json();

    if (!data) throw new Error("No data has been found");
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
