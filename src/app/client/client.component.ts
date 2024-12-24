import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Client } from '../modele/Client';
import { ClientService } from '../client.service';
import { kill } from 'process';
import Swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  constructor(private clientService: ClientService,private router: Router,private route: ActivatedRoute) {}


/*ngAfterViewInit(): void {
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
  }*/

  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }

  ngAfterViewInit(): void {
    // Initialisation de DataTables après que les données soient chargées
    $(document).ready(() => {
      this.initializeDataTable();  // Appel de la méthode d'initialisation
    });
  }
  
  initializeDataTable(): void {
    $('#example1').DataTable({
      paging: true,  // Activer la pagination
      lengthChange: true,  // Permet à l'utilisateur de changer le nombre d'éléments par page
      pageLength: 3,  // Nombre d'éléments par page par défaut
      searching: true,  // Activer la fonctionnalité de recherche
      ordering: true,  // Activer le tri
      info: true,  // Afficher le texte d'information en bas de la table
      autoWidth: false,
      dom: '<"row"<"col-sm-6 text-start"f><"col-sm-6 text-end"B>>' +
           '<"row"<"col-sm-12"tr>>' +
           '<"row"<"col-sm-5 text-start"i><"col-sm-7 text-end"p>>',
      buttons: [
        { extend: 'copy', className: 'btn btn-dark' },
        { extend: 'csv', className: 'btn btn-dark' },
        { extend: 'excel', className: 'btn btn-dark' },
        { extend: 'pdf', className: 'btn btn-dark' },
        { extend: 'print', className: 'btn btn-dark' }
      ]
    });
  }
  
  reloadDataTable(): void {
    // Si DataTables est déjà initialisé, le réinitialiser
    if ($.fn.dataTable.isDataTable('#example1')) {
      $('#example1').DataTable().clear().destroy();
    }
    this.initializeDataTable();  // Réinitialiser DataTables
  }



  userRole: string = '';

  Clients: Client[] = [];
  email:string='';
nom:string='';
prenom:string='';
 
  
  ngOnInit(): void {
    this.loadClients();

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

    if (localStorage.getItem('clientActionSuccess') === 'true') {
      this.showAlert = true;
      localStorage.removeItem('clientActionSuccess');  // Effacer après utilisation
    }
    
    if (localStorage.getItem('clientActionError') === 'true') {
      this.showError = true;
      localStorage.removeItem('clientActionError');  // Effacer après utilisation
    }
    
    if (localStorage.getItem('clientDeleted') === 'true') {
      this.showWarningAlert = true; // Afficher l'alerte après le rechargement
      localStorage.removeItem('clientDeleted'); // Supprimer l'élément après l'affichage de l'alerte
    }
  }
  
  // Charger toutes les chambres
  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.Clients = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des chambres :', error);
      }
    );
  }





  client: Client = new Client(0, '', '', '', 0, '', '', '');  // Initialiser un objet User vide




  selectClient(client: Client) {
    // Affecter les informations du client sélectionné à l'objet client
    this.client = { ...client };
    console.log('Client sélectionné pour modification :', this.client);
  }


    // Méthode pour récupérer l'utilisateur existant
    getUserById(id: number): void {
      this.clientService.getClientById(id).subscribe(
        (response) => {
          this.client = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }




   /* deleteChambre(chambre: any): void {
             console.log('Chambre ID to delete:', chambre.id);
           
             Swal.fire({
               title: 'Are you sure you want to delete this room?',
               text: 'This action is irreversible!',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: 'Yes, delete!',
             }).then((result) => {
               if (result.isConfirmed) {
                 // Suppression de la chambre
                 this.clientService.deleteClient(this.client.id).subscribe(
                   (response) => {
                     // Affichage d'un message de succès après suppression
                     Swal.fire(
                       'Deleted!',
                       `The room ${chambre.id} has been successfully deleted.`,
                       'success'
                     ).then(() => {
                       // Enregistrer dans localStorage que la suppression a eu lieu
                       localStorage.setItem('roomDeleted', 'true');
                       setTimeout(() => window.location.reload(), 1000);  // Recharger la page après suppression
                     });
                   },
                   (error) => {
                     // Gestion des erreurs
                     console.error('Error while deleting the room:', error);
                     Swal.fire(
                       'Error!',
                       'An error occurred while deleting the room.',
                       'error'
                     );
                   }
                 );
               }
             });
           }
               
    */


    resetClient(): void {
      this.client = new Client(0, '', '', '', 0, '', '', ''); // Réinitialiser l'objet client
      console.log('Client réinitialisé pour l\'ajout');
    }










    /*createClient(): void {
      console.log('Création du client:', this.client);
  
      this.clientService.addClient(this.client).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès!', response);
          this.router.navigate(['/clients']); // Rediriger après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    }
  
    // Méthode pour mettre à jour un client
    updateClient(): void {
      console.log('Mise à jour du client:', this.client);
  
      this.clientService.updateClient(this.client).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour avec succès!', response);
          this.router.navigate(['/clients']); // Rediriger après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    }*/

      showAlert = false;  // Variable pour afficher l'alerte de succès
      showError = false;  // Variable pour afficher l'alerte d'erreur
    onSubmit(): void {
      console.log('onSubmit appelé');
          const action = this.client.id ? 'update' : 'add';
          const confirmationText = `Are you sure you want to ${action} this client?`;
      
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
              if (this.client.id) {
                // Si l'ID existe, c'est une mise à jour
                this.clientService.updateClient(this.client).subscribe(
                  (response) => {
                    // Stocker l'état de l'alerte dans localStorage avant le rechargement
                    localStorage.setItem('clientActionSuccess', 'true');
                    localStorage.setItem('clientActionError', 'false');
                    setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                  },
                  (error) => {
                    // Stocker l'état de l'alerte d'erreur dans localStorage
                    localStorage.setItem('clientActionSuccess', 'false');
                    localStorage.setItem('clientActionError', 'true');
                    setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                  }
                );
              } else {
                // Sinon, c'est un ajout
                this.clientService.addClient(this.client).subscribe(
                  (response) => {
                    // Stocker l'état de l'alerte dans localStorage avant le rechargement
                    localStorage.setItem('clientActionSuccess', 'true');
                    localStorage.setItem('clientActionError', 'false');
                    setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
                  },
                  (error) => {
                    // Stocker l'état de l'alerte d'erreur dans localStorage
                    localStorage.setItem('clientActionSuccess', 'false');
                    localStorage.setItem('clientActionError', 'true');
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
            
              deleteClient(client: any): void {
                console.log('Client ID to delete:', client.id);
              
                Swal.fire({
                  title: 'Are you sure you want to delete this client?',
                  text: 'This action is irreversible!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, delete!',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Suppression de la chambre
                    this.clientService.deleteClient(client.id).subscribe(
                      (response) => {
                        // Affichage d'un message de succès après suppression
                        Swal.fire(
                          'Deleted!',
                          `The room ${client.id} has been successfully deleted.`,
                          'success'
                        ).then(() => {
                          // Enregistrer dans localStorage que la suppression a eu lieu
                          localStorage.setItem('clientDeleted', 'true');
                          setTimeout(() => window.location.reload(), 1000);  // Recharger la page après suppression
                        });
                      },
                      (error) => {
                        // Gestion des erreurs
                        console.error('Error while deleting the client:', error);
                        Swal.fire(
                          'Error!',
                          'An error occurred while deleting the client.',
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
