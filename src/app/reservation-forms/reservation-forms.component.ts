import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Reservation } from '../modele/Reservation';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from '../reservation.service';
import Swal from 'sweetalert2';
import { ChambreService } from '../chambre.service';
import { Chambre } from '../modele/Chambre';
import { ClientService } from '../client.service';
import { Client } from '../modele/Client';
import { ReservationData } from '../modele/ReservationData';
import { catchError, map, Observable, of } from 'rxjs';


declare var $: any;  



@Component({
  selector: 'app-reservation-forms',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive,HttpClientModule, ReactiveFormsModule],
  templateUrl: './reservation-forms.component.html',
  styleUrl: './reservation-forms.component.css'
})
export class ReservationFormsComponent  implements OnInit, AfterViewInit {
reservation: Reservation = new Reservation(0, 0, 0, new Date(), new Date(), 0, 1, 0,0);
reservationDataa: ReservationData = new ReservationData(0, 0, new Date(), new Date(), 0);  // Valeurs par défaut
errorMessage: string = '';
chambreId: number = 0;
chambre: Chambre = new Chambre(0, 0, 0, 0, '', '',0,0,'', false); 

  constructor(private router: Router,private reservationService: ReservationService,private route: ActivatedRoute,private chambreService :ChambreService,private fb: FormBuilder,private clientService :ClientService) {

        // Initialisation du formulaire utilisateur
        this.userForm = this.fb.group({
          prenom: ['', Validators.required],
          nom: ['', Validators.required],
          cni: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          telephone: ['', Validators.required],
          adresse: ['', Validators.required],
        });
    
        this.bookingForm = this.fb.group({
          date_debut: ['', Validators.required],
          date_fin: ['', Validators.required],
        });
  }


  userRole: string = '';
  email:string='';
nom:string='';
prenom:string='';
  ngOnInit(): void {
    this.loadReservation()
    // Charger toutes les chambres au début
    this.chambreId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID de la chambre choisie :', this.chambreId);

    this.chambreId = Number(this.route.snapshot.paramMap.get('id'));
    this.chambreService.getChambreById(this.chambreId).subscribe(
    (chambre) => {
      this.chambre = chambre; // Charger les détails de la chambre
    },
    (error) => {
      console.error('Erreur lors du chargement de la chambre :', error);
    }
  );

  this.bookingForm = this.fb.group({
    date_debut: ['', Validators.required],
    date_fin: ['', Validators.required],
  });

  console.log('Formulaire initialisé');
  
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




  /*deleteReservation(reservation: any): void {
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
  */

  /*selectReservation(reservationData: any) {
    // Implémentation pour sélectionner une réservation à modifier
    alert('Réservation sélectionnée pour modification : ' + this.reservationData.id);
  }*/
  /*selectReservation(reservation: ReservationData) {
    // Copier les données de la réservation sélectionnée dans `reservationData`
    this.reservationData = { ...reservation };
    console.log('Réservation sélectionnée pour modification :', this.reservationData);
  }*/

    get formattedDateDebut(): string {
      return this.reservationData.date_debut ? this.reservationData.date_debut.toISOString().split('T')[0] : '';
    }
  
    get formattedDateFin(): string {
      return this.reservationData.date_fin ? this.reservationData.date_fin.toISOString().split('T')[0] : '';
    }
  
    selectReservation(reservationData: ReservationData) {
      this.reservationData = {
        ...reservationData,
        date_debut: new Date(reservationData.date_debut),
        date_fin: new Date(reservationData.date_fin),
      };
      console.log('Données sélectionnées pour modification :', this.reservationData);
    }


    

    
  



  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }


  reservations: ReservationData[] = [];
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
  



  userForm!: FormGroup; // Formulaire du premier écran
  bookingForm!: FormGroup; // Formulaire du deuxième écran
  showBookingForm: boolean = false; // Contrôle de l'affichage des formulaires

  client: Client = new Client(0, '', '', '', 0, '', '', '');

/*
// Soumission du formulaire utilisateur
onSubmitUserForm() {
  if (this.userForm.valid) {
    this.clientService.addClient(this.client).subscribe(
      (response) => {
        console.log('User saved successfully:', response);
        this.showBookingForm = true; // Affiche le deuxième formulaire
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  } else {
    alert('Veuillez remplir tous les champs correctement avant de continuer.');
  }
}

// Soumission du formulaire de réservation
onSubmitBookingForm() {
  if (this.bookingForm.valid) {
    console.log('Booking details:', this.bookingForm.value);
    alert('Booking completed!');
  } else {
    alert('Veuillez remplir correctement le formulaire de réservation.');
  }

}
*/






/*onSubmitBookingForm() {
  if (this.bookingForm.valid) {
    const reservationData = {
      ...this.bookingForm.value,
      userId: this.reservation.user_id, // Utiliser l'id du client associé
      chambreId: this.chambreId       // Utiliser l'id de la chambre
    };

    this.reservationService.addReservation(reservationData).subscribe(
      (savedReservation: Reservation) => {
        Swal.fire(
          'Succès!',
          `La réservation a été créée avec succès.`,
          'success'
        ).then(() => {
          // Naviguer ou actualiser la page si nécessaire
          this.router.navigate(['/reservations']);
        });
      },
      (error) => {
        console.error("Erreur lors de l'enregistrement de la réservation :", error);
      }
    );
  } else {
    alert("Veuillez remplir tous les champs du formulaire.");
  }
}*/


onSubmitUserForm() {
  console.log('le methode onSubmitUserForm est appelé');
  if (this.userForm.valid) {
    const clientData: Client = this.userForm.value;

    const generatedPassword = this.clientService.generateRandomPassword();
    clientData.password = generatedPassword;

    this.clientService.addClient(clientData).subscribe(
      (savedClient: Client) => {
        this.reservation.user_id = savedClient.id;  // Sauvegarder l'ID utilisateur
        console.log('ID utilisateur enregistré:', savedClient.id);
        this.reservation.user_id = savedClient.id;
        this.showBookingForm = true;
        
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du client :', error);
      }
    );
  } else {
    alert('Veuillez remplir tous les champs du formulaire.');
  }
}
/*
onSubmitBookingForm() {
  if (this.bookingForm.valid) {
    const { date_debut, date_fin } = this.reservation;
    const prixChambre = this.chambre.prix;

    const diffEnMillisecondes = new Date(date_fin).getTime() - new Date(date_debut).getTime();
    const diffEnJours = diffEnMillisecondes / (1000 * 3600 * 24); 
    const montantTotal = prixChambre * diffEnJours;

    const reservationData = {
      ...this.reservation,
      chambreId: this.chambreId,
      montantTotal: montantTotal
    };

    this.reservationService.addReservation(reservationData).subscribe(
      (savedReservation) => {
        Swal.fire(
          'Succès!',
          'La réservation a été créée avec succès.',
          'success'
        ).then(() => {
          this.router.navigate(['/reservations']);
        });
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réservation :', error);
      }
    );
  } else {
    alert('Veuillez remplir tous les champs du formulaire de reservation.');
  }
}*/



/*reservationData: ReservationData = new ReservationData( 0, 0, new Date(), new Date(), 0);  
methode qui travaille correctement
onSubmitBookingForm() {
  console.log('La méthode onSubmitBookingForm est appelée');
  if (this.bookingForm.valid) {
    const { date_debut, date_fin } = this.bookingForm.value;  // Récupérer les dates depuis le formulaire
    const prixChambre = this.chambre.prix;

    // Vérification si la date de début est avant la date de fin
    if (new Date(date_debut) > new Date(date_fin)) {
      alert("La date de début ne peut pas être après la date de fin.");
      return;
    }

    // Formater les dates au format 'yyyy-MM-dd' puis les convertir en objets Date
    const formattedDateDebut = new Date(formatDate(date_debut, 'yyyy-MM-dd', 'en-US'));
    const formattedDateFin = new Date(formatDate(date_fin, 'yyyy-MM-dd', 'en-US'));

    const diffEnMillisecondes = formattedDateFin.getTime() - formattedDateDebut.getTime();
    const diffEnJours = diffEnMillisecondes / (1000 * 3600 * 24); 
    const montantTotal = prixChambre * diffEnJours;

    const reservationData: ReservationData = new ReservationData(
       // Id par défaut, sera généré par la base de données
       this.reservation.user_id, // user_id, à adapter en fonction de l'utilisateur actuel
      this.chambreId, // chambre_id, à adapter en fonction de la chambre sélectionnée
      formattedDateDebut, // date_debut
      formattedDateFin,   // date_fin
      montantTotal       // montant_total
    );
    console.log('Reservation data:', reservationData);
    this.reservationService.addReservation(reservationData).subscribe(
      (savedReservation) => {
        Swal.fire(
          'Succès!',
          'La réservation a été créée avec succès.',
          'success'
        ).then(() => {
          this.router.navigate(['/reservations']);
        });
      },
      (error) => {
        Swal.fire(
          'Erreur!',
          'Une erreur est survenue lors de l\'enregistrement de la réservation. Veuillez réessayer plus tard.',
          'error'
        );
        console.error('Erreur lors de l\'enregistrement de la réservation :', error);
      }
    );
  }
}*/
reservationData: ReservationData = new ReservationData( 0, 0, new Date(), new Date(), 0,0); 
onSubmitBookingForm() {
  console.log('La méthode onSubmitBookingForm est appelée');
  if (this.bookingForm.valid) {
    const { date_debut, date_fin } = this.bookingForm.value;  // Récupérer les dates depuis le formulaire
    const prixChambre = this.chambre.prix;

    // Vérification si la date de début est avant la date de fin
    if (new Date(date_debut) > new Date(date_fin)) {
      alert("La date de début ne peut pas être après la date de fin.");
      return;
    }

    // Formater les dates au format 'yyyy-MM-dd' puis les convertir en objets Date
    const formattedDateDebut = new Date(formatDate(date_debut, 'yyyy-MM-dd', 'en-US'));
    const formattedDateFin = new Date(formatDate(date_fin, 'yyyy-MM-dd', 'en-US'));

    const diffEnMillisecondes = formattedDateFin.getTime() - formattedDateDebut.getTime();
    const diffEnJours = diffEnMillisecondes / (1000 * 3600 * 24);
    const montantTotal = prixChambre * diffEnJours;

    const reservationData: ReservationData = new ReservationData(
       // Id par défaut, sera généré par la base de données
      this.reservation.user_id, // user_id, à adapter en fonction de l'utilisateur actuel
      this.chambreId, // chambre_id, à adapter en fonction de la chambre sélectionnée
      formattedDateDebut, // date_debut
      formattedDateFin,   // date_fin
      montantTotal,       // montant_total
      undefined
    );

    console.log('Reservation data:', reservationData);

    // Appel pour ajouter la réservation
    this.reservationService.addReservation(reservationData).subscribe(
      (savedReservation) => {
        Swal.fire(
          'Succès!',
          'La réservation a été créée avec succès.',
          'success'
        ).then(() => {
          if (savedReservation.id !== undefined) {
            this.reservationService.sendEmail(savedReservation.id).subscribe(
              () => {
                console.log(`Email envoyé avec succès pour la réservation ${savedReservation.id}`);
              },
              (error) => {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
              }
            );
          } else {
            console.error('L\'ID de la réservation est undefined.');
          }
    
          this.router.navigate(['/reservations']);
        });
      },
      (error) => {
        Swal.fire(
          'Erreur!',
          'Une erreur est survenue lors de l\'enregistrement de la réservation. Veuillez réessayer plus tard.',
          'error'
        );
        console.error('Erreur lors de l\'enregistrement de la réservation :', error);
      }
    );
    
  }
}


chambrePrice: number = 0; 
getChambrePrice(chambreId: number): Observable<number> {
  return this.chambreService.getChambreById(chambreId).pipe(
    map((chambre) => {
      if (chambre) { // Vérifier si chambre n'est pas undefined
        const prix = chambre.prix; // Accéder au prix si chambre est défini
        console.log('Prix de la chambre:', prix);
        return prix;
      } else {
        console.error('Chambre non trouvée');
        return 0; // Retourner 0 si chambre est undefined
      }
    }),
    catchError((error) => {
      console.error('Erreur lors de la récupération du prix de la chambre:', error);
      return of(0); // Retourner 0 en cas d'erreur
    })
  );
}

/*
onSubmit() {
  console.log('Formulaire soumis', this.reservationData);

  // Récupérer le prix de la chambre (en fonction de l'ID)
  this.getChambrePrice(this.reservationData.chambre_id).subscribe(
    (prixChambre) => {
      if (prixChambre === 0) {
        console.error('Le prix de la chambre n\'a pas pu être récupéré.');
        return;
      }

      console.log('Prix de la chambre récupéré:', prixChambre);

      let dateDebut: Date = this.reservationData.date_debut;
      let dateFin: Date = this.reservationData.date_fin;

      if (dateDebut && dateFin) {
        // Calcul du montant total
        const formattedDateDebut = new Date(formatDate(dateDebut, 'yyyy-MM-dd', 'en-US'));
        const formattedDateFin = new Date(formatDate(dateFin, 'yyyy-MM-dd', 'en-US'));

        const diffEnMillisecondes = formattedDateFin.getTime() - formattedDateDebut.getTime();
        const diffEnJours = diffEnMillisecondes / (1000 * 3600 * 24);

        const montantTotal = prixChambre * diffEnJours;

        this.reservationData.montant_total = montantTotal;
        console.log('Montant total calculé:', montantTotal);
      }

      // Si l'ID existe, c'est une modification
      if (this.reservationData.id) {
        this.reservationService.updateReservation(this.reservationData).subscribe(
          (response) => {
            console.log('Réservation mise à jour avec succès!', response);
            this.router.navigate(['/form_reservation']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la réservation:', error);
          }
        );
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération du prix de la chambre:', error);
    }
  );
}
*/

onSubmit() {
  console.log('Formulaire soumis', this.reservationData);

  // Récupérer le prix de la chambre (en fonction de l'ID)
  this.getChambrePrice(this.reservationData.chambre_id).subscribe(
    (prixChambre) => {
      if (prixChambre === 0) {
        console.error('Le prix de la chambre n\'a pas pu être récupéré.');
        return;
      }

      console.log('Prix de la chambre récupéré:', prixChambre);

      let dateDebut: Date = this.reservationData.date_debut;
      let dateFin: Date = this.reservationData.date_fin;

      if (dateDebut && dateFin) {
        // Calcul du montant total
        const formattedDateDebut = new Date(formatDate(dateDebut, 'yyyy-MM-dd', 'en-US'));
        const formattedDateFin = new Date(formatDate(dateFin, 'yyyy-MM-dd', 'en-US'));

        const diffEnMillisecondes = formattedDateFin.getTime() - formattedDateDebut.getTime();
        const diffEnJours = diffEnMillisecondes / (1000 * 3600 * 24);

        const montantTotal = prixChambre * diffEnJours;

        this.reservationData.montant_total = montantTotal;
        console.log('Montant total calculé:', montantTotal);
      }

      // Si l'ID existe, c'est une modification
      if (this.reservationData.id) {
        this.reservationService.updateReservation(this.reservationData).subscribe(
          (response) => {
            console.log('Réservation mise à jour avec succès!', response);
            Swal.fire(
              'Succès!',
              'La réservation a été mise à jour avec succès.',
              'success'
            ).then(() => {
            
              // Recharger la page après le clic sur OK
              location.reload(); // Rechargement de la page
            });
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la réservation:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la mise à jour de la réservation. Veuillez réessayer plus tard.',
              'error'
            );
          }
        );
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération du prix de la chambre:', error);
      Swal.fire(
        'Erreur!',
        'Une erreur est survenue lors de la récupération du prix de la chambre. Veuillez réessayer plus tard.',
        'error'
      );
    }
  );
}




deleteReservation(reservation: any): void {
  console.log('Reservation ID to delete:', reservation.id);

  // Afficher une alerte de confirmation avant la suppression
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
      // Appeler la méthode du service pour supprimer la réservation
      this.reservationService.deleteReservation(reservation.id).subscribe(
        () => {
          // Afficher un message de succès après la suppression
          Swal.fire(
            'Deleted!',
            `Reservation ${reservation.id} has been deleted successfully.`,
            'success'
          ).then(() => {
            // Actualiser la page après la suppression réussie
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error deleting reservation:', error);
          // Afficher un message d'erreur si la suppression échoue
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


logout() {
  // Supprimer les informations de l'utilisateur du localStorage
  localStorage.clear();

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


}