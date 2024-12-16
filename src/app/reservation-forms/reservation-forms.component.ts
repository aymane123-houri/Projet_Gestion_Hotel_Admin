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


declare var $: any;  



@Component({
  selector: 'app-reservation-forms',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive,HttpClientModule, ReactiveFormsModule],
  templateUrl: './reservation-forms.component.html',
  styleUrl: './reservation-forms.component.css'
})
export class ReservationFormsComponent  implements OnInit, AfterViewInit {
  reservation: Reservation = new Reservation(0, 0, 0, new Date(), new Date(), 0, 1, 0,0); // Valeurs par défaut
errorMessage: string = '';
chambreId: number = 0;
chambre: Chambre = new Chambre(0, 0, 0, 0, '', '',0,0,'', false); 

  constructor(private router: Router,private reservationService: ReservationService,private route: ActivatedRoute,private chambreService :ChambreService,private fb: FormBuilder,private clientService :ClientService) {

        // Initialisation du formulaire utilisateur
        this.userForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
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
}


*/
reservationData: ReservationData = new ReservationData(0, 0, 0, new Date(), new Date(), 0);  
onSubmitBookingForm() {
  console.log('le methode onSubmitBookingForm est appelé');
  if (this.bookingForm.valid) {
    const { date_debut, date_fin } = this.reservation;
    const prixChambre = this.chambre.prix;

    // Vérification si la date de début est avant la date de fin
    if (new Date(date_debut) > new Date(date_fin)) {
      alert("La date de début ne peut pas être après la date de fin.");
      return;
    }

    // Formater les dates au format 'yyyy-MM-dd' puis les convertir en objets Date
    const formattedDateDebut = new Date(formatDate(this.reservation.date_debut, 'yyyy-MM-dd', 'en-US'));
    const formattedDateFin = new Date(formatDate(this.reservation.date_fin, 'yyyy-MM-dd', 'en-US'));

    const diffEnMillisecondes = formattedDateFin.getTime() - formattedDateDebut.getTime();
    const diffEnJours = diffEnMillisecondes / (1000 * 3600 * 24); 
    const montantTotal = prixChambre * diffEnJours;

   /* const reservationData: ReservationData = new ReservationData(
      0, // Id par défaut, sera généré par la base de données
      1, // user_id, à adapter en fonction de l'utilisateur actuel
      this.chambreId, // chambre_id, à adapter en fonction de la chambre sélectionnée
      formattedDateDebut, // date_debut
      formattedDateFin,   // date_fin
      montantTotal       // montant_total
    );*/

    const reservationData: ReservationData = new ReservationData(
      0, // Id par défaut, sera généré par la base de données
      1, // user_id, à adapter en fonction de l'utilisateur actuel
      3, // chambre_id, à adapter en fonction de la chambre sélectionnée
      new Date(), // date_debut
      new Date(),   // date_fin
      1000       // montant_total
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
}



}




