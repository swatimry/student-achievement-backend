const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enim:["Admin","Student"]
    },
    currentAcademicYear: {
        type: String,
        enum: ["SE", "TE","BE"],
        // required: true,
    },
    certifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Certifications",
        },
    ],

});

module.exports = mongoose.model("user", userSchema);