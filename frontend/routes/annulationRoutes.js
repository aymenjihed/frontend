const express = require('express');
const { 
    getAllAnnulations,
    getAnnulation,
      } = require('../controllers/annulationControllers');

const router = express.Router();

router.get('/annulations', getAllAnnulations);
router.get('/annulation/:id',  getAnnulation);


module.exports = {
    routes: router
}
