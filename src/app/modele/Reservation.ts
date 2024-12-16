export class Reservation {
    id: number;                // ID de la réservation
    user_id: number;            // ID de l'utilisateur (utilisateur qui réserve)
    chambre_id: number;         // ID de la chambre réservée
    date_debut: Date;           // Date de début de la réservation
    date_fin: Date;             // Date de fin de la réservation
    montant_total: number;     // Montant total de la réservation
    nombreAdulte: number;      // Nombre d'adultes
    nombreEnfant: number;      // Nombre d'enfants
    nombreNuit:number
  
    constructor(
      id: number,
      user_id: number,
      chambre_id: number,
      date_debut: Date,
      date_fin: Date,
      montant_total: number,
      nombreAdulte: number,
      nombreEnfant: number,
      nombreNuit : number
    ) {
      this.id = id;
      this.user_id = user_id;
      this.chambre_id = chambre_id;
      this.date_debut = date_debut;
      this.date_fin = date_fin;
      this.montant_total = montant_total;
      this.nombreAdulte = nombreAdulte;
      this.nombreEnfant = nombreEnfant;
      this.nombreNuit=nombreNuit;
    }


  }
  