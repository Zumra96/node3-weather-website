const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d85e3e5f17656f00c8b4b3a4933f6747&query=' + latitude + ','+ longitude +'&units=m'
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        } else if(body.error){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature +" degress out. It feels like " + body.current.feelslike + " degress out")
        }
    })
}

module.exports = forecast