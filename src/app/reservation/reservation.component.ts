import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../modele/Reservation';
import { Chambre } from '../modele/Chambre';
import { HttpClientModule } from '@angular/common/http';

declare var $: any;  // Déclare jQuery pour l'utiliser dans votre composant

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive,HttpClientModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'] // Correction du nom du styleUrl en styleUrls
})
export class ReservationComponent implements OnInit, AfterViewInit {
  

  constructor(private router: Router,private reservationService: ReservationService) {}

  reservation: Reservation = new Reservation(0, 0, 0, new Date(), new Date(), 0, 1, 0,0); // Valeurs par défaut
  chambresDisponibles: Chambre[] = [];
  toutesLesChambres: Chambre[] = []; // Toutes les chambres disponibles
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadReservation()
    // Charger toutes les chambres au début
    this.reservationService.getAllChambres().subscribe(
      (response) => {
        this.toutesLesChambres = response;
        this.chambresDisponibles = [...this.toutesLesChambres]; // Afficher toutes les chambres par défaut
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des chambres.';
        console.error('Erreur:', error);
      }
    );
    
  }

ngAfterViewInit(): void {
    const table = $('#example1').DataTable({
      paging: true,  // Activer la pagination
      lengthChange: true,  // Permet à l'utilisateur de changer le nombre d'éléments par page
      pageLength: 3,  // Nombre d'éléments par page par défaut
      searching: true,  // Activer la fonctionnalité de recherche
      ordering: true,  // Activer le tri
      info: true,  // Afficher le texte d'information en bas de la table
      autoWidth: false ,

      // Activer les boutons pour exporter les données
      dom: '<"row"<"col-sm-6 text-start"f><"col-sm-6 text-end"B>>' +
           '<"row"<"col-sm-12"tr>>' +
           '<"row"<"col-sm-5 text-start"i><"col-sm-7 text-end"p>>',
      buttons: [
        {
          extend: 'copy',       // Copier dans le presse-papiers
          className: 'btn btn-dark' // Classe CSS personnalisée
        },
        {
          extend: 'csv',        // Exporter en CSV
          className: 'btn btn-dark' // Classe CSS personnalisée
        },
        {
          extend: 'excel',      // Exporter en Excel
          className: 'btn btn-dark' // Classe CSS personnalisée
        },
        {
          extend: 'pdf',        // Exporter en PDF
          className: 'btn btn-dark' // Classe CSS personnalisée
        },
        {
          extend: 'print',      // Imprimer
          className: 'btn btn-dark' // Classe CSS personnalisée
        }
      ]
    });
  }

  
/*  ngAfterViewInit(): void {
    $('#example1').DataTable({
      paging: true,  // Activer la pagination
      lengthChange: true,  // Permet à l'utilisateur de changer le nombre d'éléments par page
      pageLength: 3,  // Nombre d'éléments par page par défaut
      searching: true,  // Activer la fonctionnalité de recherche
      ordering: true,  // Activer le tri
      info: true,  // Afficher le texte d'information en bas de la table
      autoWidth: false ,
  
      // Activer les boutons pour exporter les données
      dom: '<"row"<"col-sm-6 text-start"f><"col-sm-6 text-end"B>>' + // Recherche à gauche et boutons à droite
           '<"row"<"col-sm-12"tr>>' +                              // Tableau
           '<"row"<"col-sm-5 text-start"i><"col-sm-7 text-end"p>>', // Info à gauche et pagination à droite
      buttons: [
        'copy',       // Copier dans le presse-papiers
        'csv',        // Exporter en CSV
        'excel',      // Exporter en Excel
        'pdf',        // Exporter en PDF
        'print'       // Imprimer
      ]
    });
  } */



  deleteReservation(reservation: any): void {
    console.log('Reservation ID to delete:', reservation.id);
  
    Swal.fire({
      title: `Are you sure you want to delete this reservation?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(reservation.id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              `Reservation ${reservation.id} has been deleted successfully.`,
              'success'
            ).then(() => {
              // Actualiser la page après la suppression réussie
              window.location.reload();
            });
          },
          error => {
            console.error('Error deleting reservation:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the reservation.',
              'error'
            );
          }
        );
      }
    });
  }
  

  selectReservation(reservation: any) {
    // Implémentation pour sélectionner une réservation à modifier
    alert('Réservation sélectionnée pour modification : ' + reservation.id);
  }



  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }

  submitForm() {
    // Vérification des dates (s'il y a une date de début et de fin valides)
    if (!this.reservation.date_debut || !this.reservation.date_fin) {
      this.errorMessage = 'Les dates doivent être valides.';
      return;
    }

    // Vérification que la date de fin est après la date de début
    if (this.reservation.date_fin <= this.reservation.date_debut) {
      this.errorMessage = 'La date de fin doit être après la date de début.';
      return;
    }

    // Convertir les dates en format 'yyyy-MM-dd'
    const formattedDateDebut = formatDate(this.reservation.date_debut, 'yyyy-MM-dd', 'en-US');
    const formattedDateFin = formatDate(this.reservation.date_fin, 'yyyy-MM-dd', 'en-US');

    // Appel au service pour obtenir les chambres disponibles en fonction des critères de la recherche
    this.reservationService.getChambresDisponibles(formattedDateDebut, formattedDateFin, this.reservation.nombreAdulte, this.reservation.nombreEnfant)
      .subscribe(
        (response) => {
          this.chambresDisponibles = response; // Afficher les chambres disponibles après la recherche
          this.errorMessage = '';  // Réinitialiser l'erreur
        },
        (error) => {
          this.chambresDisponibles = this.toutesLesChambres; // Réinitialiser à toutes les chambres en cas d'erreur
          this.errorMessage = 'Erreur lors de la récupération des chambres disponibles.';
          console.error('Erreur lors de la récupération des chambres:', error);
        }
      );
  }
  

  reservations: Reservation[] = [];
  loadReservation(): void {
    this.reservationService.getAllReservation().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des chambres :', error);
      }
    );
  }
  

  bookNow(chambreId: number): void {
    const url = `/form_reservation/${chambreId}`;
    window.location.href = url;
}













goToReservationForm(chambreId: number, date_debut: string, date_fin: string, adulte: number, enfant: number): void {
  this.router.navigate(['/form_reservation', chambreId], {
      queryParams: {
          date_debut: date_debut,
          date_fin: date_fin,
          adulte: adulte,
          enfant: enfant
      }
  });
}






date_debut!: string;  // Date de début
date_fin!: string;    // Date de fin
adulte!: number;      // Nombre d'adultes
enfant!: number;      // Nombre d'enfants
}