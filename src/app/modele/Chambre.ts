export class Chambre {
    id: number;
    numero: number;
    nombre_lits: number;
    prix: number;
    image: string;
    description: string;
    adulte_capacite: number;      // Nombre d'adultes
    enfant_capacite: number;
    type_lits:string; 
    disponible: boolean;
     // Nombre d'enfants



    constructor(id: number, numero: number,nombre_lits :number , prix: number, image: string, description: string ,adulte_capacite: number,
      enfant_capacite: number ,type_lits:string,disponible : boolean) {
      this.id = id;
      this.numero = numero;
      this.nombre_lits = nombre_lits;
      this.prix = prix;
      this.image = image;
      this.description = description;
      this.adulte_capacite = adulte_capacite;
      this.enfant_capacite = enfant_capacite;
      this.type_lits=type_lits;
      this.disponible = disponible;


    }
  }