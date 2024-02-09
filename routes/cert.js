const express = require("express");
const router = express.Router();
const {createCertification,getAllcertificates,getCertificatesByCategory,getCertificatesByYear}=require("../controllers/Certificate.js");
const {auth,isStudent,isAdmin}=require("../middleware/auth.js");
router.post("/createnew",auth,isStudent,createCertification);
router.get("/getallcertstudent",auth,getAllcertificates);
router.get("/getbycategory",auth,isAdmin,getCertificatesByCategory);
router.get("/getbyYear",auth,isAdmin,getCertificatesByYear);
module.exports = router;