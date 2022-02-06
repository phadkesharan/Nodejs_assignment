const express = require("express")
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

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

// route for all csv files
app.route('/')
    .get((req, res) => {

        Item.find({}, (err, items) => {
            if (!err) {
                if (items.length > 0) {
                    res.send(items);
                }
                else {
                    res.send("No items!");
                }
            }
            else {
                res.send(err);
            }
        })

    })
    .delete((req, res) => {

        Item.deleteMany({}, (err) => {
            if (!err) {
                res.sendStatus(200);
            }
            else {
                res.send(err);
            }
        })
    })

// route for a specific csv file
app.route('/:fileName')
    .get((req, res) => {
        Item.find({ file_name: req.params.fileName }, (err, items) => {
            if (!err) {
                if (items != null) {
                    res.send(items);
                }
                else {
                    res.send("No items!");
                }
            }
            else {
                res.send(err);
            }
        })
    })

    .post((req, res) => {
        Item.find({ file_name: req.params.fileName }, (err, fileItems) => {
            if (!err) {
                const newId = fileItems.length + 1;

                const newItems = new Item({
                    id: newId,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    gender: req.body.gender,
                    file_name: req.params.fileName
                })

                newItems.save();
                res.sendStatus(200);
            }
            else {
                res.send(err);
            }
        })
    })

    .delete((req, res) => {
        Item.remove({ file_name: req.params.fileName }, (err) => {
            if (!err) {
                res.sendStatus(200);
            }
            else {
                res.send(err);
            }
        })
    })

app.route('/:fileName/:itemId')
    .get((req, res) => {
        Item.findOne(
            {
                file_name: req.params.fileName,
                id: req.params.itemId
            },
            (err, foundItem) => {
                if (!err) {
                    res.send(foundItem);
                }
                else {
                    res.send(err);
                }
            })
    })

    .put((req, res) => {
        Item.updateOne(
            {
                id: req.params.itemId
            },
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender
            }, (err) => {
                if (!err) {
                    res.sendStatus(200);
                }
                else
                    res.send(err);
            })
    })

    .delete((req, res) => {
        Item.deleteOne({ id: req.params.itemId }, (err) => {
            if (!err) {
                res.sendStatus(200);
            }
            else {
                res.send(err);
            }
        })
    })


app.listen(3000, () => {
    console.log("Server started on port 3000");
})