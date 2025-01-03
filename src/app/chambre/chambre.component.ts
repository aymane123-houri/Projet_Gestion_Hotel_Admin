import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Chambre } from '../modele/Chambre';
import { ChambreService } from '../chambre.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';


declare var $: any;
@Component({
  selector: 'app-chambre',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive,HttpClientModule],
  templateUrl: './chambre.component.html',
  styleUrl: './chambre.component.css'
})
export class ChambreComponent implements OnInit, AfterViewInit {


chambres: Chambre[] = [];
numberOfChambre: number = 0;

constructor(private chambreService: ChambreService,private router: Router) {}
userRole: string = '';
email:string='';
nom:string='';
prenom:string='';
ngOnInit(): void {
  
 this.loadChambres();



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

    if (localStorage.getItem('roomActionSuccess') === 'true') {
      this.showAlert = true;
      localStorage.removeItem('roomActionSuccess');  // Effacer après utilisation
    }
    
    if (localStorage.getItem('roomActionError') === 'true') {
      this.showError = true;
      localStorage.removeItem('roomActionError');  // Effacer après utilisation
    }
    
    if (localStorage.getItem('roomDeleted') === 'true') {
      this.showWarningAlert = true; // Afficher l'alerte après le rechargement
      localStorage.removeItem('roomDeleted'); // Supprimer l'élément après l'affichage de l'alerte
    }
}


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
// Charger toutes les chambres
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

loadChambres(): void {
  this.chambreService.getAllChambres().subscribe(
    (data) => {
      this.chambres = data;
      console.log(this.chambres)
    },
    (error) => {
      console.error('Erreur lors du chargement des chambres :', error);
    }
  );
}


  
 
  
  
  // Charger toutes les chambres
  loadChambre(): void {
    this.chambreService.getAllChambres().subscribe(
      (data) => {
        this.chambres = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des chambres :', error);
      }
    );
  }





  chambre: Chambre = new Chambre(0, 0, 0, 0, '', '',0,0,'', false);  // Initialiser un objet User vide

  showAlert = false;  // Variable pour afficher l'alerte de succès
  showError = false;  // Variable pour afficher l'alerte d'erreur

  // Méthode pour soumettre le formulaire
  /*onSubmit(): void {
    if (this.chambre.id) {
      // Si l'ID existe, c'est une modification
      this.chambreService.updateChambre(this.chambre).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour avec succès!', response);
          this.router.navigate(['/chambre']); // Rediriger après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    } else {
      // Sinon, c'est une création
      this.chambreService.addChambre(this.chambre).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès!', response);
          this.router.navigate(['/chambre']); // Rediriger après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    }
  
  }*/
  


    onSubmit(): void {
      const action = this.chambre.id ? 'update' : 'add';
      const confirmationText = `Are you sure you want to ${action} this room?`;
  
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
          if (this.chambre.id) {
            // Si l'ID existe, c'est une mise à jour
            this.chambreService.updateChambre(this.chambre).subscribe(
              (response) => {
                // Stocker l'état de l'alerte dans localStorage avant le rechargement
                localStorage.setItem('roomActionSuccess', 'true');
                localStorage.setItem('roomActionError', 'false');
                setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
              },
              (error) => {
                // Stocker l'état de l'alerte d'erreur dans localStorage
                localStorage.setItem('roomActionSuccess', 'false');
                localStorage.setItem('roomActionError', 'true');
                setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
              }
            );
          } else {
            // Sinon, c'est un ajout
            this.chambreService.addChambre(this.chambre).subscribe(
              (response) => {
                // Stocker l'état de l'alerte dans localStorage avant le rechargement
                localStorage.setItem('roomActionSuccess', 'true');
                localStorage.setItem('roomActionError', 'false');
                setTimeout(() => window.location.reload(), 1000);  // Recharger après un délai
              },
              (error) => {
                // Stocker l'état de l'alerte d'erreur dans localStorage
                localStorage.setItem('roomActionSuccess', 'false');
                localStorage.setItem('roomActionError', 'true');
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





  selectChambre(chambre: Chambre) {
    // Affecter les informations du client sélectionné à l'objet client
    this.chambre = { ...chambre };
    console.log('Chambre sélectionné pour modification :', this.chambre);
  }
    // Méthode pour récupérer l'utilisateur existant
    getChambreById(id: number): void {
      this.chambreService.getChambreById(id).subscribe(
        (response) => {
          this.chambre = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération de chambre:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }




    /*deleteChambre(chambre: any): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce chambre?')) {
        this.chambreService.deleteChambre(chambre.id).subscribe(
          (response) => {
            console.log('Client supprimé avec succès!', response);
            // Mettre à jour la liste des chambres
            this.loadChambres(); // Recharger les clients après suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du chambre :', error);
          }
        );
      }
    }*/


//bien travaille
     /* deleteChambre(chambre: any): void {
        console.log('Chambre ID to delete:', chambre.id);
      
        Swal.fire({
          title: `Êtes-vous sûr de vouloir supprimer cette chambre?`,
          text: "Cette action est irréversible!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.chambreService.deleteChambre(chambre.id).subscribe(
              (response) => {
                Swal.fire(
                  'Supprimé!',
                  `La chambre ${chambre.id} a été supprimée avec succès.`,
                  'success'
                ).then(() => {
                  // Mettre à jour la liste des chambres après la suppression
                  this.loadChambres(); // Recharger les chambres après suppression
                });
              },
              (error) => {
                console.error('Erreur lors de la suppression de la chambre :', error);
                Swal.fire(
                  'Erreur!',
                  'Une erreur est survenue lors de la suppression de la chambre.',
                  'error'
                );
              }
            );
          }
        });
      }*/
      
        showWarningAlert = false;
      
        deleteChambre(chambre: any): void {
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
              this.chambreService.deleteChambre(chambre.id).subscribe(
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
            




  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }


onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.chambre.image = e.target.result.split(',')[1]; // Enlever la partie 'data:image/...'
        };
        reader.readAsDataURL(file);
    }



  }

  convertToBoolean() {
    // Convertit la valeur en boolean si nécessaire
    if (typeof this.chambre.disponible === 'string') {
      this.chambre.disponible = this.chambre.disponible === 'true';
    }
  }




  

  chambreToDelete!: Chambre;

  deleteConfirmedChambre(): void {
    // Appeler votre méthode deleteChambre pour supprimer le produit
    this.chambreService.deleteChambre(this.chambreToDelete.id).subscribe(
      () => {
        console.log("Chambre successfully deleted!");
        // Supprimer le Chambre de la liste après la suppression réussie
        this.chambres = this.chambres.filter(p => p.id !== this.chambreToDelete.id);

        //this.numberOfChambre = this.chambres.length;
      },
      (error) => {
        console.error("Error deleting product:", error);
      }
    );
    // Fermer la modal de confirmation après la suppression
    $('#confirmDeleteChambreModal').modal('hide');
  }


  confirmDeleteChambre(chambre: Chambre): void {
    // Stocker le produit à supprimer dans une variable temporaire
    this.chambreToDelete = chambre;
    // Afficher la modal de confirmation
    $('#confirmDeleteChambreModal').modal('show');
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



