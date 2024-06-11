class Utilisateur {
    constructor(DateDeNaissance, ville, NumeroDeTel, email, id, motdepasse, nom, prenom) {
        this.DateDeNaissance = DateDeNaissance;
        this.ville = ville;
        this.NumeroDeTel = NumeroDeTel;
        this.email = email;
        this.id = id;
        this.motdepasse = motdepasse;
        this.nom = nom;
        this.prenom = prenom;
    }
}


module.exports = Utilisateur;

