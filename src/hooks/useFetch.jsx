import React, { useState, useEffect } from "react";

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    fetch(url)
      .then((response) =>
        response
          .json()
          .then((jsonData) => {
            setData(jsonData);
          })
          .catch((error) => console.error(error))
      )
      .catch((error) => console.error(error));
  }, [url]);
  return data;
};

export default useFetch;
