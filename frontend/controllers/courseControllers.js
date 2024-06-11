'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const Course = require('../models/course'); // Import de la classe Course
const firebaseAdmin = require('firebase-admin');



// Fonction pour récupérer toutes les courses
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await firestore.collection('Courses');
        const data = await courses.get();
        const coursesArray = [];
        if (data.empty) {
            res.status(404).send('No courses found');
        } else {
            data.forEach(doc => {
                const course = new Course(
                    doc.data()["Coût de la course"],
                    doc.data().Destination,
                    doc.data().Départ,
                    doc.data()["Heure de prise en charge"],
                    doc.data()["ID chauffeur assigné"],
                    doc.data()["ID de la course"],
                    doc.data()["ID utilisateur"],
                    doc.data()["Statut de la course"],
                    doc.data().placedebut,
                    doc.data().placefin,
                    doc.data().service
                );
                coursesArray.push(course);
            });
            res.send(coursesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Fonction pour récupérer une course par son ID
const getCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await firestore.collection('Courses').doc(id).get();
        if (!course.exists) {
            res.status(404).send('Course not found');
        } else {
            res.send(course.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};



// Fonction pour supprimer une course
const deleteCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('Courses').doc(id).delete();
        res.send('Course deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
   
    getAllCourses,
    getCourse,
    deleteCourse
};
