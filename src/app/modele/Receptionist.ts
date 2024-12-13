export class Receptionist {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    cni: string;
    password: string;
    role:string;
  
    constructor(
      id: number,
      nom: string,
      prenom: string,
      email: string,
      telephone: string,
      adresse: string,
      cni: string,
      password: string,
      role:string
    ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.telephone = telephone;
      this.adresse = adresse;
      this.cni = cni;
      this.password = password;
      this.role = role;
    }
  }
  