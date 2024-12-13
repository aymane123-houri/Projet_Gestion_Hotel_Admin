import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Pas de modification nécessaire dans ngOnInit
  }

  ngAfterViewInit(): void {

    $('#example1').DataTable({
      paging: true,  // Activer la pagination
      lengthChange: true,  // Permet à l'utilisateur de changer le nombre d'éléments par page
      pageLength: 3,  // Nombre d'éléments par page par défaut
      searching: true,  // Activer la fonctionnalité de recherche
      ordering: true,  // Activer le tri
      info: true,  // Afficher le texte d'information en bas de la table
      autoWidth: false  // Désactiver l'ajustement automatique de la largeur des colonnes
    }); // Initialisation de DataTables sur le tableau
  }

  deleteReservation(reservation: any) {
    // Implémentation pour supprimer une réservation
    alert('Réservation supprimée : ' + reservation.id);
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