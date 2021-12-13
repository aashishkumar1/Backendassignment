const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/studentEvaluation");
};

const userSchema = new mongoose.Schema({
    first_name : { type: String, required: true},
    last_name : { type: String, required: true},
    gender : { type: String, required: true},
    date_of_birth : { type: String, required: true},
},{
    versionKey : false,
    timestamps : true
});
const User = mongoose.model("user",userSchema);

const studentSchema = new mongoose.Schema({
    roll_id : { type: Number, required: true},
    current_batch : { type: String, required: true},
    marks: {type:Number,required:true},
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const Student = mongoose.model("student",studentSchema);

const evaluationtSchema = new mongoose.Schema({
    date_of_evaluation : { type: String, required: true},
    instructor : { type: String, required: true},
    topic_name : { type: String, required: true},
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    student_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "student",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const Evaluation = mongoose.model("evaluation",evaluationtSchema);

app.post('/user',async (req,res) => {
    const user = await User.create(req.body);

    return res.status(201).send(user);
});
app.post('/student',async (req,res) => {
    const user = await Student.create(req.body);

    return res.status(201).send(user);
});
app.get('/evaluation/student/:topic_name',async (req,res)=>{
    const user = await Student.find({topic_name : req.params.topic_name});
    return res.status(201).send(user);
});


app.get('/highmarks',async (req,res) => {
    const user = await Student.find({}).sort({marks: -1});

    return res.status(201).send(user[0]);
});




app.listen(2345, async () => {
    await connect();
    console.log("Port 2345");
});
