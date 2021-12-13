const express = require('express');
const upload = require('../middleware/upload.js')
const {User, Movie, Theatre, Screen, Show, Seat} = require('../models/user.model.js')
const router = express.Router();

router.post('/movies', upload.single("profile_photo_url") ,async (req,res) => {
    try {
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            profile_photo_url : req.file.path,
            roles : req.body.roles,
        });
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});

router.get('/shows/:movie_id/:screen_id',async (req,res) => {
    try {
        const user = await Show.findById({movie_id : req.params.movie_id,screen_id : req.params.screen_id});
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});

router.get('/seats/:show_id',async (req,res) => {
    try {
        const user = await Seat.find({show_id : req.params.show_id});
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});

router.get('/shows/nearest',async (req,res) => {
    try {
        const user = await Show.find({location: req.body.location});
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});

router.get('/movies',async (req,res) => {
    try {
        const user = await Movie.find({actors: req.body.actor});
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});

router.post('/seat',async (req,res) => {
    try {
        if(req.body.seats < total_seats)
        {
            const user = await Seat.create({});
            return res.status(200).json({user});
        }
        else{
            res.status(400).json({status:"Seats not available"});
        }
       
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});

module.exports = router;