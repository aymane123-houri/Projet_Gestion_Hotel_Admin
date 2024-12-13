import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Chambre } from '../modele/Chambre';
import { ChambreService } from '../chambre.service';
import { HttpClientModule } from '@angular/common/http';


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

constructor(private chambreService: ChambreService,private router: Router) {}

ngOnInit(): void {
  this.loadChambres();
}

// Charger toutes les chambres
loadChambres(): void {
  this.chambreService.getAllChambres().subscribe(
    (data) => {
      this.chambres = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des chambres :', error);
    }
  );
}

  
 
  
  
  // Charger toutes les chambres
  loadChamnre(): void {
    this.chambreService.getAllChambres().subscribe(
      (data) => {
        this.chambres = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des chambres :', error);
      }
    );
  }





  chambre: Chambre = new Chambre(0, 0, '', 0, '', '', '');  // Initialiser un objet User vide


  // Méthode pour soumettre le formulaire
  onSubmit(): void {


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




    deleteChambre(chambre: any): void {
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
    }










  ngAfterViewInit(): void {
    $('#example1').DataTable({
      paging: true, // Activer la pagination
      lengthChange: true, // Permet à l'utilisateur de changer le nombre d'éléments par page
      pageLength: 3, // Nombre d'éléments par page par défaut
      searching: true, // Activer la fonctionnalité de recherche
      ordering: true, // Activer le tri
      info: true, // Afficher le texte d'information en bas de la table
      autoWidth: false // Désactiver l'ajustement automatique de la largeur des colonnes
    }); // Initialisation de DataTables sur le tableau
  }


  reloadPage(route: string) {
    this.router.navigateByUrl(route).then(() => {
      window.location.reload(); // Recharge la page
    });
  }





  

}
