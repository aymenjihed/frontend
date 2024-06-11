'use strict';

const firebase = require('../db');
const Utilisateur = require('../models/utilisateur'); // Import de la classe Utilisateur
const firestore = firebase.firestore();
const firebaseAdmin = require('firebase-admin');





// Fonction pour supprimer un utilisateur avec Firebase Admin SDK
const deleteUser = async (uid) => {
    return firebaseAdmin.auth().deleteUser(uid);
};

// Fonction pour mettre à jour un utilisateur avec Firebase Admin SDK
const updateUser = async (uid, data) => {
    return firebaseAdmin.auth().updateUser(uid, data);
};



const getAllUtilisateurs = async (req, res, next) => {
    try {
        const utilisateurs = await firestore.collection('utilisateur');
        const data = await utilisateurs.get();
        const utilisateursArray = [];
        if (data.empty) {
            res.status(404).send('No utilisateur record found');
        } else {
            data.forEach(doc => {
                const utilisateur = new Utilisateur(
                    doc.data().DateDeNaissance,
                    doc.data().ville,
                    doc.data().NumeroDeTel,
                    doc.data().email,
                    doc.data().id,
                    doc.data().motdepasse,
                    doc.data().nom,
                    doc.data().prenom
                );
                utilisateursArray.push(utilisateur);
            });
            res.send(utilisateursArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUtilisateur = async (req, res, next) => {
    try {
        const id = req.params.id;
        const utilisateur = await firestore.collection('utilisateur').doc(id);
        const data = await utilisateur.get();
        if (!data.exists) {
            res.status(404).send('Utilisateur with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUtilisateur = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

       

        await firestore.collection('utilisateur').doc(id).update(data);
          // Mettre à jour le mot de passe de l'utilisateur
          if (data.motdepasse) {
            // Récupérer l'utilisateur correspondant à ce chauffeur
            const userRecord = await firebaseAdmin.auth().getUserByEmail(data.email); // Suppose que vous avez le champ email dans vos données

            // Mettre à jour le mot de passe
            await firebaseAdmin.auth().updateUser(userRecord.uid, {
                password: data.motdepasse
            });
        }
        res.send('Utilisateur record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const deleteUtilisateur = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Supprimer l'utilisateur avec Firebase Admin SDK
        await deleteUser(id);
        // Supprimer l'utilisateur de Firestore
        await firestore.collection('utilisateur').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
   
    getAllUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    deleteUtilisateur
}