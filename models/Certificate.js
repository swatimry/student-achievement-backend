const mongoose = require('mongoose');

const Certifications = new mongoose.Schema({
    student: 
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
        certname:{
          type:String,
          required:true,
          
        },
    yearOfCourses: {
        type: Number,
        required: true,
    },
    student_name:{
       type:String,
       required:true,
    },
    AcademicYear: {
        type: String,
        enum: ["SE", "TE","BE"],
        required: true,
    },
    Category : {
        type: String,
        enum: ["Co-curricular", "Extra-curricular"],
        required: true,
    },
    googleDriveLink: 
        {
        type: String,
        required: true,
    }
    ,
})

module.exports = mongoose.model("Certifications", Certifications);