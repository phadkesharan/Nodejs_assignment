const express = require("express");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const path = require('path');
const csv = require('csvtojson');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({
    extended: true
}));

mongoose
    .connect("mongodb://localhost:27017/testDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

const itemsSchema = mongoose.Schema({
    id: Number,
    first_name: String,
    last_nams: String,
    email: String,
    gender: String,
    file_name: String
})

const Item = mongoose.model('item', itemsSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/profile', upload.single('csvFile'), (req, res)=>{
    csv()
    .fromFile(req.file.path)
    .then((obj)=>{

        obj.forEach((item)=>{
            item.file_name = req.body.title;
        })

        Item.insertMany(obj, (err)=>{
            if(!err) 
                console.log("inserted!");
            
            res.sendFile(path.join(__dirname, 'success.html'));
        })

    })
})

app.listen(3000, ()=> {
    console.log("Server started on port 3000");
})