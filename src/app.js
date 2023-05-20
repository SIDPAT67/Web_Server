const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')   
const forcast = require('./utils/forcast')      

const app = express()

// Define paths for Express config
const publisDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engiene and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directories to serve
app.use(express.static(publisDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Siddharth Patel'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About US',
        name: 'Siddharth Patel'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text:'Help is here',
        name: 'Siddharth Patel'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {} ) => {
        if(error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if(error) {
                res.send({ error })
            }
            res.send({       
                forcast: forcastData,
                address: req.query.address
            })
            
        })
    })
    
})

app.get('/products', (req, res) => {
if (!req.query.search) {
    return res.send({
        error: 'You must provide a search term.'
    })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404 Error',
        name: 'Siddharth Patel',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404 Error',
        name: 'Siddharth Patel',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})