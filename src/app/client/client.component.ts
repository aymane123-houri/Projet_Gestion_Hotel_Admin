import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Client } from '../modele/Client';
import { ClientService } from '../client.service';
import { kill } from 'process';



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

  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }





  Clients: Client[] = [];
  
 
  
  ngOnInit(): void {
    this.loadClients();


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


  // Méthode pour soumettre le formulaire
  onSubmit(): void {

    console.log('Formulaire soumis', this.client);   // Ajouter un log pour vérifier les données envoyées

    if (this.client.id) {
      // Si l'ID existe, c'est une modification
      this.clientService.updateClient(this.client).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour avec succès!', response);
          this.router.navigate(['/clients']); // Rediriger après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    } else {
      // Sinon, c'est une création
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
  
  }
  

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




    deleteClient(client: any): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce client?')) {
        this.clientService.deleteClient(client.id).subscribe(
          (response) => {
            console.log('Client supprimé avec succès!', response);
            // Mettre à jour la liste des clients
            this.loadClients(); // Recharger les clients après suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du client:', error);
          }
        );
      }
    }
    


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


    
}
