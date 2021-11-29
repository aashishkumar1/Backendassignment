const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/Naukri");
}

const companySchema = new mongoose.Schema({
    company_name : {type: String , required : true},
    num_jobs : {type: Number , required : true}
},{
    versionKey : false,
    timestamps : true
});
const company = mongoose.model("company",companySchema);

const jobSchema = new mongoose.Schema({
    job_title : {type: String , required : true},
    job_location : {type : String , required : true},
    skill : {type: String , required : true},
    job_type : {type: String , required : true},
    join_in : {type: String , required : true},
    rating : {type: Number,  required : true},
    company_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "company",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const job = mongoose.model("job",companySchema);

//company

app.post("/company", async (req,res) => {
    const newdata = await company.create(req.body);
    return res.status(201).send(newdata);
});
app.get("/company", async (req,res) => {
    const newdata = await company.find().lean().exec();
    return res.send(newdata);
});
//jobs
app.post("/job", async (req,res) => {
    const newdata = await job.create(req.body);
    return res.status(201).send(newdata);
});
app.get("/job", async (req,res) => {
    const newdata = await job.find().lean().exec();
    return res.send({newdata});
});


//evaluation api
app.get("/job/:skill", async (req,res) => {

const newData = await job.findById(req.params.skill).lean().exec(); //1st

return res.send({newData});

});
app.get("/job/:job_type", async (req,res) => {

    const newData = await job.findById(req.params.job_type).lean().exec();  //2nd
    
    return res.send({newData});
    
    });
app.get("/job/:job_in", async (req,res) => {

        const newData = await job.findById(req.params.job_in , {$eq: 2}).lean().exec();  //3rd
        
        return res.send({newData});
});
app.get("/job/:rating", async (req,res) => {
    let srt = req.params.rating;
    const newData = await job.find().sort({srt : 1}).lean().exec();  //4th
    
    return res.send({newData});
});
app.get("/company", async (req,res) => {

    const newData = await company.find().lean().exec();  //5th
    
    return res.send({newData});
});
app.get("/company/:num_jobs", async (req,res) => {
    let a = req.params.num_jobs;
    const newData = await company.find().sort({a:-1}).lean().exec();  //6th
    let arr = newData[0];
    return res.send(arr);
});


app.listen(2525, async () => {
    await connect();
    console.log("start");
});


