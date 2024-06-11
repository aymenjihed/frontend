const express = require('express');
const { getAllObservations, getObservation, deleteObservation,respondToObservation } = require('../controllers/observationControllers');

const router = express.Router();

router.get('/observations', getAllObservations);
router.get('/observation/:id', getObservation);
router.delete('/observation/:id', deleteObservation);
router.put('/observation/:id', respondToObservation );

module.exports = {
    routes: router
};
