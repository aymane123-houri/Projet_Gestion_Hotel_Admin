export class Chambre {
    id: number;
    numero: number;
    nombre_lits: string;
    prix: number;
    image: string;
    description: string;
    disponible: string;


    constructor(id: number, numero: number,nombre_lits :string , prix: number, image: string, description: string ,disponible : string ) {
      this.id = id;
      this.numero = numero;
      this.nombre_lits = nombre_lits;
      this.prix = prix;
      this.image = image;
      this.description = description;
      this.disponible = disponible;

    }
  }