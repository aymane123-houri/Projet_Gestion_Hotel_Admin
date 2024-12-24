export class ReservationData {
    id?:number;
    user_id:number;
    date_debut: Date;
    date_fin: Date;
    montant_total: number;
    chambre_id: number;


    constructor(
        
        user_id: number,
        chambre_id: number,
        date_debut: Date,
        date_fin: Date,
        montant_total: number,
        id?:number,

      ) {
        
        this.user_id = user_id;
        this.chambre_id = chambre_id;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.montant_total = montant_total;
        if (id !== undefined) {
            this.id = id;
          }
      }
  }
  

  