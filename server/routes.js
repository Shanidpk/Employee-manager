const express = require('express');
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId

const Employee = require('./employee')


// GET SINGLE EMPLOYEE
    router.get('/:id',(req,res) => {
        if(ObjectId.isValid(req.params.id)){
            Employee.findById(req.params.id,(err,doc) => {
                if(!err){
                    res.send(doc);
                }else{
                    console.log("error in get data in",err)
                }
            })
        }else{
            return res.status(400).send(`No record wirh ${req.params.id}`)
        }
    })

//POST API
router.post('/',(req,res) => {
    let emp = new Employee({
        name:req.body.name,
        position:req.body.position,
        dept:req.body.dept
    })

    emp.save((err,doc) => {
        if(err){
            console.log("error");
        }else{
            res.send(doc)
        }
       
    })
})

//GET API
router.get('/',(req,res) => {
    Employee.find((err,doc)=> {
        if(err){
            console.log("Error in get data"+err);
        }else{
            res.send(doc);
        }
    })
})

//PUT Update the api

router.put('/:id',(req,res) => {
    if(ObjectId.isValid(req.params.id)){
       
        let emp = {
            name:req.body.name, 
            position:req.body.position,
            dept:req.body.dept
        }
        Employee.findByIdAndUpdate(req.params.id, {$set:emp},{new:true}, (err,doc) =>{
            if(err){
                console.log("error in update");
            }else{
                console.log("resopnse working",res);
                res.send(doc)
            }
        })
    }
})


//DELETE single employee
 router.delete('/:id',(req,res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndDelete(req.params.id, (err,doc) => {
            if(err){
                console.log(`Error in delete ${req.params.id}`);
            }else{
                res.send(doc)
            }
        })

        
    }else{
        return res.status(400).send(`no record found with the id ${req.params.id}`)
    }
 })

module.exports = router
