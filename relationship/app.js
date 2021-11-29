const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/library");
};

const sectionSchema = new mongoose.Schema({

},{
    versionKey : false,
    timestamps : true
});

const section = mongoose.model("section",sectionSchema);

const bookSchema = new mongoose.Schema({
    book_name : { type: String, required: true},
    body : { type: String, required: true},
    section_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "section",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const book = mongoose.model("book",sectionSchema);

const authorkSchema = new mongoose.Schema({
    first_name : { type: String, required: true},
    last_name : { type: String, required: true},
    section_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "book",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const author = mongoose.model("author",sectionSchema);

//section
app.post('/users',async (req,res) => {
    const user = await section.create(req.body);

    return res.status(201).send(user);
});
app.get('/users/:id',async (req,res) => {
    const user = await section.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/users/:id',async (req,res) => {
    const user = await section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/users/:id',async (req,res) => {
    const user = await section.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});

//book
app.post('/users',async (req,res) => {
    const user = await book.create(req.body);

    return res.status(201).send(user);
});
app.get('/users/:id',async (req,res) => {
    const user = await book.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/users/:id',async (req,res) => {
    const user = await book.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/users/:id',async (req,res) => {
    const user = await book.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});
//author
app.post('/users',async (req,res) => {
    const user = await author.create(req.body);

    return res.status(201).send(user);
});
app.get('/users/:id',async (req,res) => {
    const user = await author.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/users/:id',async (req,res) => {
    const user = await author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/users/:id',async (req,res) => {
    const user = await author.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});

//other api's



app.listen(2233,async ()=>{
    await connect();
    console.log("Start");
});
