let mongoose = require("mongoose");
let playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(v);
            },
            message: props => `${props.value} is not a valid Name!`
        },
        required: [true, 'User Name is required'],
    },
    age: {
        type: Number,
        min: [1, "Invalid Values "],
        max: [70, "Invalid Values"],
        required: true,
    },
    teamName: {
        type: String,
        enum: ["csk", "mi", "srh", "kkr", "rcb", "delhi", "rr", "Isg", "gt"],
        lowercase: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email is required'],
    },
    nationality: String,

});
let Player = new mongoose.model("player", playerSchema);


let saveDataIntoDatabase = async () => {

    try {
        let shreyasIyer = new Player({
            playerName: "ShreyasIyer Kumar",
            age: 32,
            teamName: "DELHI",
            email: "shreyasiyer@gmail.com",
            nationality: "Indian",

        });
        let nirmalKumar = new Player({
            playerName: "Nirmal Kumar",
            age: 42,
            teamName: "RCB",
            email: "nirmalnirman36@gmail.com",
            nationality: "Indian",

        });
        let bholuKumar = new Player({
            playerName: "Bholu Kumar",
            age: 26,
            teamName: "kkr",
            email: "bholu@gmail.com",
            nationality: "Indian",
        });
        Player.insertMany([shreyasIyer, bholuKumar, nirmalKumar]);
        console.log("Successfully save data into Mongo Database");
    }
    catch (err) {
        console.log("unable to Store " + err);
        console.log("Unable to store data into Database" + err);
    }
}

let connectToMongoDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://nirmalirish1234:Nirman%4024@nirmal.p9uda40.mongodb.net/cricket?retryWrites=true&w=majority&appName=Nirmal");
        saveDataIntoDatabase();
        console.log("You are successfully connected with Mongo DB");
    }
    catch (err) {
        console.log("You are not able to connected with Mongo DB" + err);

    }

}
connectToMongoDB();