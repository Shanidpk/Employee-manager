const mongoose = require ('mongoose')
const mongoDB = 'mongodb://localhost:27017/Employees'
    mongoose.connect(mongoDB,{useNewUrlParser:true}, err => {
    if(!err){
        console.log("db connected");
    }else{
        console.log("error"+err);
    }
})

module.exports = mongoose