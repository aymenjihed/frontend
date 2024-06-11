'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const Annulations = require('../models/annulations');

// Function to get all annulations
const getAllAnnulations = async (req, res, next) => {
    try {
        const annulationsSnapshot = await firestore.collection('Annulations').get();
        const annulationsArray = [];
        if (annulationsSnapshot.empty) {
            console.log('Aucune annulation trouvée');
            return res.status(404).send('Aucune annulation trouvée');
        }

        annulationsSnapshot.forEach(doc => {
            const annulation = new Annulations(
                doc.id,
                doc.data()["ID chauffeur"],
                doc.data().Statut,
                doc.data()["date confirmation"],
                doc.data()["date annulation"]
            );
            annulationsArray.push(annulation);
        });
        res.status(200).send(annulationsArray);
    } catch (error) {
        console.error('Erreur lors de la récupération des annulations:', error.message);
        res.status(400).send('Erreur lors de la récupération des annulations');
    }
};

// Function to get an annulation by ID
const getAnnulation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const annulationDoc = await firestore.collection('Annulations').doc(id).get();
        if (!annulationDoc.exists) {
            return res.status(404).send('Annulation non trouvée');
        }
        res.status(200).send(annulationDoc.data());
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'annulation:', error.message);
        res.status(400).send('Erreur lors de la récupération de l\'annulation');
    }
};

module.exports = {
    getAllAnnulations,
    getAnnulation,
};
