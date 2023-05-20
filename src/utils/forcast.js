const request = require('request')

const forcast = (latitude, longitude, callback) => {
    
    const url = 'https://api.weatherapi.com/v1/current.json?key=1b5fbaf7350a4c9194e64156230605&q=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined,
                body.location.name +', '+ body.location.region +', '+ body.location.country + '.'+ '\nIt is currently ' + body.current.temp_c + ' degrees out.\nHumidity is '+ body.current.humidity + '%.'
            )
        }
    
    })
}
module.exports = forcast
