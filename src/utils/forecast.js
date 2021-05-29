const request = require('postman-request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b5b5519c554480e3d476b3549e25fd5c&query=${long},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        desc: body.current.weather_descriptions[0],
        temp: body.current.temperature,
        feel: body.current.feelslike,
        time: body.location.localtime
      })
    }
  });
};

module.exports = forecast