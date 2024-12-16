import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Receptionist } from '../modele/Receptionist';
import { ReceptionistService } from '../receptionist.service';

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

ngOnInit(): void {
  this.loadReceptionist();
}

// Charger toutes les receptionists
loadReceptionist(): void {
  this.receptionistService.getAllReceptionists().subscribe(
    (data) => {
      this.receptionists = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des chambres :', error);
    }
  );
}

  




  receptioniste: Receptionist = new Receptionist(0, '', '', '', '', '', '', '','');  // Initialiser un objet User vide


  // Méthode pour soumettre le formulaire
  // Méthode pour soumettre le formulaire
  onSubmit(): void {

    console.log('Formulaire soumis', this.receptioniste);   // Ajouter un log pour vérifier les données envoyées

    if (this.receptioniste.id) {
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
  

  selectReceptionist(receptioniste: Receptionist) {
    // Affecter les informations du client sélectionné à l'objet client
    this.receptioniste = { ...receptioniste};
    console.log('Receptionist sélectionné pour modification :', this.receptioniste);
  }
  
    // Méthode pour récupérer l'utilisateur existant
    getReceptionistById(id: number): void {
      this.receptionistService.getReceptionistById(id).subscribe(
        (response) => {
          this.receptioniste = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération de Receptionist:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }




    deleteReceptionist(receptionist: any): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce chambre?')) {
        this.receptionistService.deleteReceptionist(receptionist.id).subscribe(
          (response) => {
            console.log('Client supprimé avec succès!', response);
            // Mettre à jour la liste des Receptionist
            this.loadReceptionist(); // Recharger les clients après suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du chambre :', error);
          }
        );
      }
    }



  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }




      resetReceptionist(): void {
        this.receptioniste = new Receptionist(0, '', '', '', '', '', '', '',""); // Réinitialiser l'objet client
        console.log('Client réinitialisé pour l\'ajout');
      }
  
}
