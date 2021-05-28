const request = require('postman-request')

const geocode = (address, callback) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2VhdGgyMjgiLCJhIjoiY2tvdmI3OG9pMDE0NjJ2bGs4YnZwN2RkMyJ9.LjIQuO1jPgB9eihTPnhyRw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (body.message) {
      callback(body.message, undefined)
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
};

module.exports = geocode