const express = require('express');
const router = express.Router();


// Importez la fonction pour écouter les modifications de la base de données Firestore
const {  watchCourseChanges } = require('../controllers/notificationControllers');





watchCourseChanges();


module.exports = {
    routes: router
};
