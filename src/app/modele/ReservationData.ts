export class ReservationData {
    id: number;
    date_debut: Date;
    date_fin: Date;
    montant_total: number;
    chambre_id: number;
    user_id: number;

    constructor(
        id: number,
        user_id: number,
        chambre_id: number,
        date_debut: Date,
        date_fin: Date,
        montant_total: number,

      ) {
        this.id = id;
        this.user_id = user_id;
        this.chambre_id = chambre_id;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.montant_total = montant_total;
      }
  }
  

  