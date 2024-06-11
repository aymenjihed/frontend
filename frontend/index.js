'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const chauffeurRoutes = require('./routes/Chauffeur-routes'); // ajustement du nom du fichier
const adminRoutes = require('./routes/Admin-routes'); // ajustement du nom du fichier
const notificationRoutes = require('./routes/notification-routes'); // ajustement du nom du fichier
const utilisateurRoutes = require('./routes/utilisateur-routes');// ajustement du nom du fichier
const courseRoutes = require('./routes/course-routes');// ajustement du nom du fichier
const observationRoutes = require('./routes/observationRoutes');// ajustement du nom du fichier
const annulationRoutes= require('./routes/annulationRoutes');// ajustement du nom du fichier
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', chauffeurRoutes.routes);
app.use('/api', adminRoutes.routes);
app.use('/api', notificationRoutes.routes);
app.use('/api', utilisateurRoutes.routes);
app.use('/api', courseRoutes.routes);
app.use('/api', observationRoutes.routes);
app.use('/api', annulationRoutes.routes);
app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
