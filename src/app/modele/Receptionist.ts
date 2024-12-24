export class Receptionist {
    _id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    cni: string;
    password: string;
    role:string;
  
    constructor(
      
      nom: string,
      prenom: string,
      email: string,
      telephone: string,
      adresse: string,
      cni: string,
      password: string,
      role:string,
      _id?: string,
    ) {
     
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.telephone = telephone;
      this.adresse = adresse;
      this.cni = cni;
      this.password = password;
      this.role = role;
      if (_id !== undefined) {
        this._id = _id;
      }
    }
  }
  