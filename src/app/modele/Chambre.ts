export class Chambre {
    id: number;
    numero: number;
    nombre_lits: number;
    prix: number;
    image: string;
    description: string;
    nombreAdulte: number;      // Nombre d'adultes
    nombreEnfant: number;
    type_lits:string; 
    disponible: boolean;
     // Nombre d'enfants



    constructor(id: number, numero: number,nombre_lits :number , prix: number, image: string, description: string ,nombreAdulte: number,
      nombreEnfant: number ,type_lits:string,disponible : boolean) {
      this.id = id;
      this.numero = numero;
      this.nombre_lits = nombre_lits;
      this.prix = prix;
      this.image = image;
      this.description = description;
      this.nombreAdulte = nombreAdulte;
      this.nombreEnfant = nombreEnfant;
      this.type_lits=type_lits;
      this.disponible = disponible;


    }
  }