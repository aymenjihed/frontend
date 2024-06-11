

class Observation {
    constructor(commentaire, note, nomChauffeur, nomUtilisateur, id, idCourse, statut, reponse) {
        this.commentaire = commentaire;
        this.note = note;
        this.nomChauffeur = nomChauffeur;
        this.nomUtilisateur = nomUtilisateur;
        this.id = id;
        this.idCourse = idCourse;
        this.statut = statut;
        this.reponse = reponse;
    }
}

module.exports = Observation;
