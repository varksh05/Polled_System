const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const app = express();

const WineModel = require("./models/WineModel");
const UserModel = require("./models/UserModel");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://polled_data:root@cluster.giern.mongodb.net/polled_system?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((err) => {
    if (!err) {
      console.log("Database connected...!");
    } else {
      console.log("Error in connecting Database", err);
    }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection successfull");
});

const retriveWineData = async() => {
    // newWineData
    try {
        const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        const newWineData = new WineModel({
            pictureURL: res.data.drinks[0].strDrinkThumb,
            fullname: res.data.drinks[0].strDrink,
            instructions: res.data.drinks[0].strInstructions,
            // createdAt: Date.now()
        });
        await newWineData.save();
        return newWineData
    } catch (err) {
        console.log("An error occured while attempting to fetch wine data", err)
    }
}

const retriveUserData = async() => {
    try {
        const res = await axios.get("https://randomuser.me/api/")
        const newUserData = new UserModel({
            pictureURL: res.data.results[0].picture.thumbnail,
            fullname: res.data.results[0].gender == 'male' ? 'Mr. ' + res.data.results[0].name.first + ' ' + res.data.results[0].name.last : 'Ms. ' + res.data.results[0].name.first + ' ' + res.data.results[0].name.last,
            email: res.data.results[0].email,
            username: res.data.results[0].login.username,
            password: res.data.results[0].login.password
        });
        await newUserData.save();
        return newUserData
    } catch (err) {
        console.log("An error occured while attempting to fetch user data", err)
    }
}

app.get('/wine', (req, res) => {
    retriveWineData()
    console.log('Read Wine')
    WineModel.findOne({}).sort({_id: -1}).exec( (err, docs) => { 
        res.status(200).send(docs)
    });
    
})

app.get('/user', (req, res) => {
    retriveUserData()
    console.log('Read User')
    UserModel.findOne({}).sort({_id: -1}).exec( (err, docs) => { 
        res.status(200).send(docs)
    });
})

app.listen(3001, () => {
  console.log("Server running on port http://localhost:3001");
});
