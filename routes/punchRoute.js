const express = require('express');
const punchModel = require('../models/punch');
const app = express();

app.get("/punches", async (req, res) => {
    var query = {};
    if (req.query.company) {
        query = { "company": req.query.company };
    }
    console.log(`Searching for ${JSON.stringify(query)}`);
    const filter = ['person', 'company', 'punchTime', 'type']
    const punches = await punchModel.find(query, filter);

    try {
        // console.log(punches);
        res.send(punches);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/punch-in', async (req, res) => {
    var newEntry = req.body;
    // Form validation
    console.log(req.body);
    if(!req.body.type){
        newEntry.type = "In";
    }
    if(!req.body.punchTime){
        newEntry.punchTime = Date.now();
    }
    if(req.body.person && req.body.company){
        console.log("New Entry: ", newEntry)
        const punch = new punchModel(newEntry);
    
        try{
            await punch.save();
            res.status(500).json(punch);
        } catch (err){
            res.status(500).json(err);
        }
    } else {
        res.status(500).json("Some error ocurred")
    }
});

app.post('/punch-out', async (req, res) => {
    var newEntry = req.body;
    // Form validation
    console.log(req.body);
    if(!req.body.type){
        newEntry.type = "Out";
    }
    if(!req.body.punchTime){
        newEntry.punchTime = Date.now();
    }
    if(req.body.person && req.body.company){
        console.log("New Entry: ", newEntry)
        const punch = new punchModel(newEntry);
    
        try{
            await punch.save();
            res.status(500).json(punch);
        } catch (err){
            res.status(500).json(err);
        }
    } else {
        res.status(500).json("Some error ocurred")
    }
});


app.post('/punch', async (req, res) => {
    const punch = new punchModel(req.body);
    try {
        await punch.save();
        res.send(punch);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;