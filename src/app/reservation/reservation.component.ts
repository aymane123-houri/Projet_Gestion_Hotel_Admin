import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { ReservationService } from '../reservation.service';

declare var $: any;  // Déclare jQuery pour l'utiliser dans votre composant

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'] // Correction du nom du styleUrl en styleUrls
})
export class ReservationComponent implements OnInit, AfterViewInit {
  reservations = [
    {
      id: 1,
      userId: 101,
      chambreId: 201,
      dateDebut: new Date('2024-12-05'),
      dateFin: new Date('2024-12-08'),
      montantTotal: 300
    },
    {
      id: 2,
      userId: 102,
      chambreId: 202,
      dateDebut: new Date('2024-12-06'),
      dateFin: new Date('2024-12-08'),
      montantTotal: 250
    },
    {
      id: 3,
      userId: 103,
      chambreId: 203,
      dateDebut: new Date('2024-12-07'),
      dateFin: new Date('2024-12-12'),
      montantTotal: 500
    },
    {
      id: 4,
      userId: 104,
      chambreId: 204,
      dateDebut: new Date('2024-12-08'),
      dateFin: new Date('2024-12-09'),
      montantTotal: 150
    },
    {
      id: 5,
      userId: 104,
      chambreId: 204,
      dateDebut: new Date('2024-12-08'),
      dateFin: new Date('2024-12-09'),
      montantTotal: 150
    },
    {
      id: 6,
      userId: 104,
      chambreId: 204,
      dateDebut: new Date('2024-12-08'),
      dateFin: new Date('2024-12-09'),
      montantTotal: 150
    }
  ];

  constructor(private router: Router,private reservationService: ReservationService) {}

  ngOnInit(): void {
    // Pas de modification nécessaire dans ngOnInit
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
}