'use strict';

const firebase = require('../db');
const admin = require('firebase-admin');
const moment = require('moment');

// Initialisation du SDK Firebase Admin avec vos informations de compte de service
const serviceAccount = require('../taxi-express-1eddb-firebase-adminsdk-5bk54-d6345aadd6.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = firebase.firestore();

// Méthode pour envoyer une notification via Firebase Cloud Messaging
const sendNotificationToUser = async (userId, statut) => {
    try {
        // Récupère les données de l'utilisateur depuis Firestore
        const userDoc = await admin.firestore().collection('notification').doc(userId).get();

        if (userDoc.exists) {
            // Récupère les tokens FCM de l'utilisateur à partir du document utilisateur
            const fcmTokens = userDoc.data().tokens;

            if (!fcmTokens || fcmTokens.length === 0) {
                console.log('Aucun token FCM trouvé pour l\'utilisateur avec ID :', userId);
                return;
            }

            let message = {};
            switch (statut) {
                case 'Confirmer':
                    message = {
                        tokens: fcmTokens,
                        notification: {
                            title: 'Taxi Express',
                            body: 'Votre course est confirmée'
                        }
                    };
                    break;
                case 'arriver Destination':
                    message = {
                        tokens: fcmTokens,
                        notification: {
                            title: 'Taxi Express',
                            body: 'Votre Chauffeur est arrivé'
                        }
                    };
                    break;
                case 'Terminer la course':
                    message = {
                        tokens: fcmTokens,
                        notification: {
                            title: 'Taxi Express',
                            body: 'Votre course est terminée'
                        }
                    };
                    break;
                case 'Annuler':
                    message = {
                        tokens: fcmTokens,
                        notification: {
                            title: 'Taxi Express',
                            body: 'Votre course est annulée'
                        }
                    };
                    break;
                case 'Annuler par chauffeur':
                    message = {
                        tokens: fcmTokens,
                        notification: {
                            title: 'Taxi Express',
                            body: 'Le chauffeur a annulé la confirmation et attend un autre chauffeur.'
                        }
                    };
                    break;
                default:
                    console.log('Statut inconnu :', statut);
                    return;
            }

            // Envoie la notification à l'utilisateur
            const response = await admin.messaging().sendMulticast(message);
            console.log('Notification envoyée avec succès :', response);
        } else {
            console.log('Utilisateur non trouvé avec ID :', userId);
        }
    } catch (error) {
        console.log('Erreur lors de l\'envoi de la notification :', error);
    }
};

// Méthode pour envoyer une notification via Firebase Cloud Messaging au chauffeur
const sendNotificationToChauffeur = async (chauffeurId, messageBody) => {
    try {
        // Récupère les données du chauffeur depuis Firestore
        const userDoc = await admin.firestore().collection('notification').doc(chauffeurId).get();

        if (userDoc.exists) {
            // Récupère les tokens FCM du chauffeur à partir du document utilisateur
            const fcmTokens = userDoc.data().tokens;

            if (!fcmTokens || fcmTokens.length === 0) {
                console.log('Aucun token FCM trouvé pour le chauffeur avec ID :', chauffeurId);
                return;
            }

            const message = {
                tokens: fcmTokens,
                notification: {
                    title: 'Taxi Express Chauffeur',
                    body: messageBody
                }
            };

            // Envoie la notification au chauffeur
            const response = await admin.messaging().sendMulticast(message);
            console.log('Notification envoyée avec succès :', response);
        } else {
            console.log('Chauffeur non trouvé avec ID :', chauffeurId);
        }
    } catch (error) {
        console.log('Erreur lors de l\'envoi de la notification :', error);
    }
};

// Méthode pour envoyer une notification via Firebase Cloud Messaging à tous les chauffeurs
const sendNotificationToAllChauffeurs = async (messageBody) => {
    try {
        // Récupère tous les documents de la collection 'notification'
        const chauffeursSnapshot = await admin.firestore().collection('notification').get();

        if (chauffeursSnapshot.empty) {
            console.log('Aucun chauffeur trouvé.');
            return;
        }

        // Parcourt chaque document et envoie une notification
        chauffeursSnapshot.forEach(async (doc) => {
            const chauffeurId = doc.id;
            const data = doc.data();
            if (data && data['statut'] === 'chauffeur') {
                await sendNotificationToChauffeur(chauffeurId, messageBody);
            }
        });

        console.log('Notifications envoyées à tous les chauffeurs.');
    } catch (error) {
        console.log('Erreur lors de l\'envoi des notifications :', error);
    }
};

// Fonction pour calculer la différence en minutes entre deux dates
const getDifferenceInMinutes = (date1, date2) => {
    const diffMs = date1 - date2;
    return Math.floor(diffMs / 60000); // 60000 ms = 1 minute
};

// Fonction pour vérifier et envoyer des notifications avant la prise en charge
const checkAndSendPrePickupNotifications = async () => {
    const now = new Date();
    const coursesRef = firestore.collection('Courses');
    const snapshot = await coursesRef.get();
    snapshot.forEach(doc => {
        const data = doc.data();
        const Time = new Date(data['Heure de prise en charge']);
        const pickupDate = moment(Time, 'YYYY-MM-DD HH:mm:ss').toDate();
        const differenceInMinutes = getDifferenceInMinutes(pickupDate, now);
        if (differenceInMinutes > 9 && differenceInMinutes <= 10 && data['Statut de la course'] === 'Confirmer') {
            sendNotificationToChauffeur(data['ID chauffeur assigné'], 'Aller vers ' + data['placedebut'] + ' si vous n\'êtes pas à cette place,\n votre course commence dans 10 minutes.');
            console.log(`Notification envoyée au chauffeur ${data['ID chauffeur assigné']} pour une prise en charge dans 10 minutes`);
        }
    });
};

// Écoute des modifications de la base de données Firestore pour les courses
const watchCourseChanges = () => {
    const coursesRef = firestore.collection('Courses');
    coursesRef.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'modified') {
                const newData = change.doc.data();
                if (newData['Statut de la course'] !== "Non Confirmer") {
                    sendNotificationToUser(newData['ID utilisateur'], newData['Statut de la course']);
                    console.log('Modification détectée : Notification envoyée à l\'utilisateur');
                }
                if (newData['Statut de la course'] === "Annuler") {
                    sendNotificationToChauffeur(newData['ID chauffeur assigné'],"L'utilisateur a annulé la course.");
                    console.log('Modification détectée : Notification envoyée au chauffeur');
                }
            }
            if (change.type === 'added') {
                const newData = change.doc.data();
                if (newData['Statut de la course'] === "Non Confirmer") { 
                    sendNotificationToAllChauffeurs('Une course de ' + newData['placedebut'] + ' à ' + newData['placefin']);
                }
            }
        });
    });

    const acceptationRef = firestore.collection('Annulations');
    acceptationRef.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'modified') {
                const newData = change.doc.data();
                if (newData['Statut'] === "Annuler") {
                    firestore.collection('Courses').doc(change.doc.id).get()
                        .then(doc => {
                            if (doc.exists) {
                                const userData = doc.data();
                                const userId = userData['ID utilisateur'];

                                // Envoyer la notification à l'utilisateur
                                sendNotificationToUser(userId, 'Annuler par chauffeur');
                                console.log('Modification détectée : Notification envoyée au passager');
                            } else {
                                console.log('Aucun document correspondant trouvé dans Courses');
                            }
                        });
                }
            }
        });
    });

    // Vérifie les courses toutes les minutes pour envoyer les notifications de prise en charge
    setInterval(checkAndSendPrePickupNotifications, 60000);
};

module.exports = {
    watchCourseChanges
};
