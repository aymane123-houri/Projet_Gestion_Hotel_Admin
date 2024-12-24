import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { ChambreService } from '../chambre.service';
import { Chambre } from '../modele/Chambre';
import { Client } from '../modele/Client';
import { ClientService } from '../client.service';
import { ReservationService } from '../reservation.service';
import { ReceptionistService } from '../receptionist.service';
import { Receptionist } from '../modele/Receptionist';
import { Reservation } from '../modele/Reservation';
import { ReservationData } from '../modele/ReservationData';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive,CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private router: Router,private chambreService: ChambreService,private clientService:ClientService,private reservationService:ReservationService,private receptionistService:ReceptionistService) {}

  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }
  userRole: string = '';
  email:string='';
nom:string='';
prenom:string='';
  ngOnInit(): void {
    const user = localStorage.getItem('User');
    if (!user) {
      // Redirige vers la page de connexion si non connecté
      window.location.href = '/login';
    } else {
      this.userRole = JSON.parse(user).role;
      this.email = JSON.parse(user).email;
      this.nom = JSON.parse(user).nom;
      this.prenom = JSON.parse(user).prenom;
      console.log(this.userRole);
    }

    this.loadChambres();
  this.loadClients();
  this.loadReceptionists();
  this.loadReservations();

  }
  


  logout() {
    // Supprimer les informations de l'utilisateur du localStorage
    localStorage.removeItem('User');
  
    // Affichage d'un message de succès
    Swal.fire(
      'Succès!',
      'Vous êtes déconnecté avec succès!',
      'success'
    ).then(() => {
      // Rediriger l'utilisateur vers la page de connexion
      this.router.navigate(['/login']);
    });
  
  }

chambres: Chambre[] = [];
numberOfChambres: number = 0;
  loadChambres(): void {
    this.chambreService.getAllChambres().subscribe(
      (data) => {
        this.chambres = data; // Affecter les données reçues à la liste des chambres
        this.numberOfChambres = this.chambres.length; // Récupérer le nombre de chambres
        console.log('Chambres:', this.chambres); // Afficher les chambres dans la console
        console.log('Nombre de chambres:', this.numberOfChambres); // Afficher le nombre de chambres
      },
      (error) => {
        console.error('Erreur lors du chargement des chambres :', error);
      }
    );
  }


  
clients: Client[] = [];
numberOfClients: number = 0;
  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data; // Affecter les données reçues à la liste des chambres
        this.numberOfClients = this.clients.length; // Récupérer le nombre de chambres
        console.log('clients:', this.clients); // Afficher les chambres dans la console
        console.log('Nombre de Clients:', this.numberOfClients); // Afficher le nombre de chambres
      },
      (error) => {
        console.error('Erreur lors du chargement des Clients :', error);
      }
    );
  }
  
  receptionists: Receptionist[] = [];
numberOfReceptionists: number = 0;
  loadReceptionists(): void {
    this.receptionistService.getAllReceptionists().subscribe(
      (data) => {
        this.receptionists = data; // Affecter les données reçues à la liste des chambres
        this.numberOfReceptionists = this.receptionists.length; // Récupérer le nombre de chambres
        console.log('Receptionists:', this.receptionists); // Afficher les chambres dans la console
        console.log('Nombre de Receptionists:', this.numberOfReceptionists); // Afficher le nombre de chambres
      },
      (error) => {
        console.error('Erreur lors du chargement des Receptionists :', error);
      }
    );
  }

  reservations: ReservationData[] = [];
  numberOfReservations: number = 0;
    loadReservations(): void {
      this.reservationService.getAllReservation().subscribe(
        (data) => {
          this.reservations = data; // Affecter les données reçues à la liste des chambres
          this.numberOfReservations = this.reservations.length; // Récupérer le nombre de chambres
          console.log('Reservations:', this.reservations); // Afficher les chambres dans la console
          console.log('Nombre de Reservations:', this.numberOfReservations); // Afficher le nombre de chambres
        },
        (error) => {
          console.error('Erreur lors du chargement des Reservations :', error);
        }
      );
    }
}
