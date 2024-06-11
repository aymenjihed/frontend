const express = require('express');
const { 
    getAllAdmin, 
    loginAdmin,
    updateAdmin
      
      } = require('../controllers/adminControllers');

const router = express.Router();


router.get('/admins', getAllAdmin);
router.post("/signin", loginAdmin);
router.put("/admin/:id", updateAdmin);



module.exports = {
    routes: router
}