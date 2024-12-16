export class Client {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: number;
    adresse: string;
    cni: string;
    password: string;
  
    constructor(
      id: number,
      nom: string,
      prenom: string,
      email: string,
      telephone: number,
      adresse: string,
      cni: string,
      password: string
    ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.telephone = telephone;
      this.adresse = adresse;
      this.cni = cni;
      this.password = password;
    }
  }
  