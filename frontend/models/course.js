class Course {
    constructor(cout, destination, depart, heurePriseEnCharge, idChauffeur,idcourse, idUtilisateur, statut, placeDebut, placeFin, service) {
        this.cout = cout;
        this.destination = destination;
        this.depart = depart;
        this.heurePriseEnCharge = heurePriseEnCharge;
        this.idChauffeur = idChauffeur;
        this.idcourse=idcourse;
        this.idUtilisateur = idUtilisateur;
        this.statut = statut;
        this.placeDebut = placeDebut;
        this.placeFin = placeFin;
        this.service = service;
    }
}
module.exports = Course;