const express = require('express')
const user = require('./userRoutes')
const role = require('./roleRoutes')


module.exports = app => {
    app.use(express.json(),
            express.urlencoded({ extended: false }),
            user,
            role
            
            )
}