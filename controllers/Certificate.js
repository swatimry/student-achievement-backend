
const User = require("../models/User");
require("dotenv").config();
const Certifications = require('../models/Certificate.js');


exports.createCertification = async (req, res) => {
  try {
    const {student, certname, yearOfCourses, AcademicYear, Category, googleDriveLink,student_name } = req.body;
    console.log( student, certname, yearOfCourses, AcademicYear, Category, googleDriveLink,student_name );
    // Validate input as needed
    if ( !student || !certname || !yearOfCourses || !AcademicYear || !Category || !googleDriveLink ||!student_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Create certification
    const newCertification = await Certifications.create({
      student,
      certname,
      yearOfCourses,
      AcademicYear,
      Category,
      googleDriveLink,
      student_name
    });
    console.log(newCertification);
    const certificationId = newCertification._id;
    const userId = student; // Replace with the actual user ID
await User.findByIdAndUpdate(userId, {
  $push: { certifications: certificationId },
});

    res.status(200).json({
      success: true,
      message: 'Certification created successfully',
      Certification: newCertification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getCertificatesByAcademicYear = async (req, res) => {
  try {
    const { AcademicYear } = req.query  ;

   
    
    
   
    const certificates = await Certifications.find({ AcademicYear: AcademicYear });

    return res.status(200).json({
      success: true,
      message: 'Certificates retrieved successfully',
      data: certificates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getCertificatesByYear = async (req, res) => {
  try {
    const { Year } = req.query  ;

   
    const parsedYear = parseInt(Year);

    if (isNaN(parsedYear)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year provided in the request body',
      });
    }
    
    // Now, 'parsedYear' is a valid number, use it in the query
    const certificates = await Certifications.find({ yearOfCourses: parsedYear });

    return res.status(200).json({
      success: true,
      message: 'Certificates retrieved successfully',
      data: certificates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getAllCertificatesforadmin = async (req, res) => {
  try {
    console.log("inhere")
    const certificates = await Certifications.find();
    console.log(certificates);
    return res.status(200).json({
      success: true,
      message: 'Certificates retrieved successfully',
      data: certificates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getCertificatesByCategory = async (req, res) => {
  try {
    const { category } = req.query  ;
    console.log(category);
   
    const certificates = await Certifications.find({ Category: category });
    console.log("hre",certificates);


    return res.status(200).json({
      success: true,
      message: 'Certificates retrieved successfully',
      data: certificates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getAllcertificates=async(req,res)=>{
    try{
        const { studentId } = req.query;
        const user = await User.findById(studentId).populate('certifications');

        if (!user) {
          throw new Error('User not found');
        }
    
        // Access the populated certifications
        const certifications = user.certifications;
    
       
    

    return res.status(200).json({
      success: true,
      message: 'Certificates retrieved successfully',
      data: certifications,
    })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
    }
}


