const express = require("express");
const router = express.Router();
const {createCertification,getAllcertificates,getCertificatesByCategory,getCertificatesByYear,getAllCertificatesforadmin, getCertificatesByAcademicYear}=require("../controllers/Certificate.js");
const {auth,isStudent,isAdmin}=require("../middleware/auth.js");
router.post("/createnew",auth,isStudent,createCertification);
router.get("/getallcertstudent",auth,getAllcertificates);
router.get("/getbycategory",auth,isAdmin,getCertificatesByCategory);
router.get("/getbyYear",auth,isAdmin,getCertificatesByYear);
router.get("/getbyacademicYear",auth,isAdmin,getCertificatesByAcademicYear);
router.get("/getalladmin",auth,isAdmin,getAllCertificatesforadmin);
module.exports = router;    