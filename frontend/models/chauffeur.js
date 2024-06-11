class Chauffeur {
    constructor(Série, compte, email, id, latitude, longitude, motdepasse, positionActuelle, txtFirstName, txtLastName, ville,NumeroDeTel,DateDeNaissance,Disponibilité) {
        this.Série = Série;
        this.compte = compte;
        this.email = email;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.motdepasse = motdepasse;
        this.positionActuelle = positionActuelle;
        this.txtFirstName = txtFirstName;
        this.txtLastName = txtLastName;
        this.ville = ville;
        this.NumeroDeTel = NumeroDeTel;
        this.DateDeNaissance = DateDeNaissance;
        this.Disponibilité = Disponibilité;
    }
}

module.exports = Chauffeur;
