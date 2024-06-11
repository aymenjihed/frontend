'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Import de la classe Chauffeur


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifiez si l'utilisateur existe dans la collection Firestore
      const adminSnapshot = await firestore.collection("admin").where("email", "==", email).get();
  
      // Si aucun utilisateur n'est trouvé, renvoyez une erreur
      if (adminSnapshot.empty) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      }
  
      // Récupérez le premier utilisateur trouvé (en supposant que l'email est unique)
      const adminData = adminSnapshot.docs[0].data();
  
      // Vérifiez si le mot de passe correspond
      if (adminData.password !== password) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      }
  
      
  
      res.status(200).json({ admin: adminData, message: "Login successful" });
    } catch (error) {
      // Si une erreur se produit, renvoyez une erreur avec le message
      res.status(500).json({ error: error.message });
    }
  };
  
const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await firestore.collection('admin');
    const data = await admin.get();
    const adminArray = [];
    if (data.empty) {
        res.status(404).send('No admin record found');
    } else {
        data.forEach(doc => {
            const admine = new Admin(
              
                doc.data().email,
                doc.data().password,
                doc.data().id,
              
            );
            adminArray.push(admine);
        });
        res.send(adminArray);
    }
} catch (error) {
    res.status(400).send(error.message);
}
}

const updateAdmin = async (req, res, next)=> {
  try {
    const id = req.params.id;
    const data = req.body;
    const admin = await firestore.collection('admin').doc(id);
    await admin.update(data);
    res.send('admin record updated successfully');
} catch (error) {
    res.status(400).send(error.message);
}

  
}

module.exports = {
  getAllAdmin,
  loginAdmin,
  updateAdmin
}
