const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(address)+',356&limit=5&appid=7ffcab13c46e7198431c0f4817477bec'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod || body.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].name +', '+ body[0].state +', '+ body[0].country
            })
        }
    
    })
}

module.exports = geocode
