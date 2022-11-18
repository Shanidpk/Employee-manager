const mongoose = require('mongoose')
 //emplyee model
 
const Employee = mongoose.model('Employee', {
    name:String,
    position:String,
    dept:String
})

module.exports = Employee