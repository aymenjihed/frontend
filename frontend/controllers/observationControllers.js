'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const Observation = require('../models/observation');

// Function to get all observations
const getAllObservations = async (req, res, next) => {
    try {
        const observationsSnapshot = await firestore.collection('Observation').get();
        const observationsArray = [];
        if (observationsSnapshot.empty) {
            console.log('Aucune observation trouvée');
            return res.status(404).send('Aucune observation trouvée');
        }

        observationsSnapshot.forEach(doc => {
            const observation = new Observation(
                doc.data().Commentaire,
                doc.data().Note,
                doc.data().NomChauffeur,
                doc.data().NomUtilisateur,
                doc.id,
                doc.data().idCourse,
                doc.data().statut,
                doc.data().reponse
            );
            observationsArray.push(observation);
        });
        res.status(200).send(observationsArray);
    } catch (error) {
        console.error('Erreur lors de la récupération des observations:', error.message);
        res.status(400).send('Erreur lors de la récupération des observations');
    }
};

// Function to get an observation by ID
const getObservation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const observationDoc = await firestore.collection('Observation').doc(id).get();
        if (!observationDoc.exists) {
            return res.status(404).send('Observation non trouvée');
        }
        res.status(200).send(observationDoc.data());
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'observation:', error.message);
        res.status(400).send('Erreur lors de la récupération de l\'observation');
    }
};

// Function to delete an observation
const deleteObservation = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('Observation').doc(id).delete();
        res.status(200).send('Observation supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'observation:', error.message);
        res.status(400).send('Erreur lors de la suppression de l\'observation');
    }
};

// Function to respond to an observation
const respondToObservation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { reponse } = req.body;
        const observationDoc = firestore.collection('Observation').doc(id);
        await observationDoc.update({ reponse });
        res.status(200).send('Réponse enregistrée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la réponse:', error.message);
        res.status(400).send('Erreur lors de l\'enregistrement de la réponse');
    }
};

module.exports = {
    getAllObservations,
    getObservation,
    deleteObservation,
    respondToObservation
};
