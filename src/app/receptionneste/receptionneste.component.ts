import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Receptionist } from '../modele/Receptionist';
import { ReceptionistService } from '../receptionist.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-receptionneste',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './receptionneste.component.html',
  styleUrl: './receptionneste.component.css'
})
export class ReceptionnesteComponent implements OnInit, AfterViewInit {





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
  /*receptionnistes = [
    {
      id: 1,
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      password: 'password123',
      telephone: '0123456789',
      cni: 'AB123456',
      role: 'Receptionniste'
    },
    {
      id: 2,
      nom: 'Smith',
      prenom: 'Jane',
      email: 'jane.smith@example.com',
      password: 'password456',
      telephone: '0987654321',
      cni: 'CD789012',
      role: 'Receptionniste'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Pas de modification nécessaire dans ngOnInit
  }*/

    receptionists: Receptionist[] = [];

constructor(private receptionistService: ReceptionistService,private router: Router) {}
userRole: string = '';
email:string='';
nom:string='';
prenom:string='';
ngOnInit(): void {
  this.loadReceptionist();

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

    if (localStorage.getItem('receptionistActionSuccess') === 'true') {
      this.showAlert = true;
      localStorage.removeItem('receptionistActionSuccess');  // Effacer après utilisation
    }
    
    if (localStorage.getItem('receptionistActionError') === 'true') {
      this.showError = true;
      localStorage.removeItem('receptionistActionError');  // Effacer après utilisation
    }
    
    if (localStorage.getItem('receptionistDeleted') === 'true') {
      this.showWarningAlert = true; // Afficher l'alerte après le rechargement
      localStorage.removeItem('receptionistDeleted'); // Supprimer l'élément après l'affichage de l'alerte
    }
}

// Charger toutes les receptionists
loadReceptionist(): void {
  this.receptionistService.getAllReceptionists().subscribe(
    (data) => {
      this.receptionists = data;
      console.log(this.receptionists)
    },
    (error) => {
      console.error('Erreur lors du chargement des chambres :', error);
    }
  );
}

  




  receptioniste: Receptionist = new Receptionist('', '', '', '', '', '', '', '','');  // Initialiser un objet User vide


  // Méthode pour soumettre le formulaire
  // Méthode pour soumettre le formulaire
  /*onSubmit(): void {

    console.log('Formulaire soumis', this.receptioniste);   // Ajouter un log pour vérifier les données envoyées

    if (this.receptioniste._id) {
      // Si l'ID existe, c'est une modification
      this.receptionistService.updateReceptionist(this.receptioniste).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour avec succès!', response);
          this.router.navigate(['/reception']); // Rediriger après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    } else {
      // Sinon, c'est une création
      this.receptionistService.addReceptionist(this.receptioniste).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès!', response);
          this.router.navigate(['/reception']); // Rediriger après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    }
  
  }
  */

  selectReceptionist(receptioniste: Receptionist) {
    // Affecter les informations du client sélectionné à l'objet client
    this.receptioniste = { ...receptioniste};
    console.log('Receptionist sélectionné pour modification :', this.receptioniste);
  }
  
    // Méthode pour récupérer l'utilisateur existant
    getReceptionistById(_id: string): void {
      this.receptionistService.getReceptionistById(_id).subscribe(
        (response) => {
          this.receptioniste = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération de Receptionist:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }




  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }



      resetReceptionist(): void {
        this.receptioniste = new Receptionist('', '', '', '', '', '', '',""); // Réinitialiser l'objet client
        console.log('Client réinitialisé pour l\'ajout');
      }
  





      
            showAlert = false;  // Variable pour afficher l'alerte de succès
            showError = false;  // Variable pour afficher l'alerte d'erreur
          onSubmit(): void {
            console.log('onSubmit appelé');
                const action = this.receptioniste._id ? 'update' : 'add';
                const confirmationText = `Are you sure you want to ${action} this receptionist?`;
            
                Swal.fire({
                  title: confirmationText,
                  text: "This action will be applied immediately.",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: `Yes, ${action}!`,
                  cancelButtonText: 'Cancel',
                }).then((result) => {
                  if (result.isConfirmed) {
                    if (this.receptioniste._id) {
                      // Si l'ID existe, c'est une mise à jour
                      this.receptionistService.updateReceptionist(this.receptioniste).subscribe(
                        (response) => {
                          // Stocker l'état de l'alerte dans localStorage avant le rechargement
                          localStorage.setItem('receptionistActionSuccess', 'true');
                          localStorage.setItem('receptionistActionError', 'false');
                          setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                        },
                        (error) => {
                          // Stocker l'état de l'alerte d'erreur dans localStorage
                          localStorage.setItem('receptionistActionSuccess', 'false');
                          localStorage.setItem('receptionistActionError', 'true');
                          setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                        }
                      );
                    } else {
                      // Sinon, c'est un ajout
                      this.receptionistService.addReceptionist(this.receptioniste).subscribe(
                        (response) => {
                          // Stocker l'état de l'alerte dans localStorage avant le rechargement
                          localStorage.setItem('receptionistActionSuccess', 'true');
                          localStorage.setItem('receptionistActionError', 'false');
                          setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                        },
                        (error) => {
                          // Stocker l'état de l'alerte d'erreur dans localStorage
                          localStorage.setItem('receptionistActionSuccess', 'false');
                          localStorage.setItem('receptionistActionError', 'true');
                          setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                        }
                      );
                    }
                  }
                });
              }
          
              // Fermer l'alerte de succès
            closeAlert(): void {
              this.showAlert = false;
            }
      
      
      
      
      
      
            showWarningAlert = false;
                  
                    deleteReceptionist(receptionist: any): void {
                      console.log('receptionist ID to delete:', receptionist._id);
                    
                      Swal.fire({
                        title: 'Are you sure you want to delete this receptionist?',
                        text: 'This action is irreversible!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, delete!',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          // Suppression de la chambre
                          this.receptionistService.deleteReceptionist(receptionist._id).subscribe(
                            (response) => {
                              // Affichage d'un message de succès après suppression
                              Swal.fire(
                                'Deleted!',
                                `The receptionist ${receptionist._id} has been successfully deleted.`,
                                'success'
                              ).then(() => {
                                // Enregistrer dans localStorage que la suppression a eu lieu
                                localStorage.setItem('receptionistDeleted', 'true');
                                setTimeout(() => window.location.reload(), 1000);  // Recharger la page après suppression
                              });
                            },
                            (error) => {
                              // Gestion des erreurs
                              console.error('Error while deleting the receptionist:', error);
                              Swal.fire(
                                'Error!',
                                'An error occurred while deleting the receptionist.',
                                'error'
                              );
                            }
                          );
                        }
                      });
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


                    
}
