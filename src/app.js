const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather', 
        name: 'Bruno'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Bruno"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message:"This is help message",
        title:"Help",
        name: "Bruno"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error:'You must provide address!!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({
                error:error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })

    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide search term!!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Bruno",
        errorMessage: "Help article not found"
    })})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Bruno",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})