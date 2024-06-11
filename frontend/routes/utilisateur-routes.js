const express = require('express');
const {
        getAllUtilisateurs, 
        getUtilisateur,
        updateUtilisateur,
        deleteUtilisateur
      } = require('../controllers/utilisateurControllers');

const router = express.Router();


router.get('/utilisateurs', getAllUtilisateurs);
router.get('/utilisateur/:id', getUtilisateur);
router.put('/utilisateur/:id', updateUtilisateur);
router.delete('/utilisateur/:id', deleteUtilisateur);

module.exports = {
    routes: router
}
