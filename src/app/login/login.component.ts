import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [RouterLink,RouterLinkActive],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginTextMargin = '0%'; // Valeur initiale pour la marge gauche de "Login"
  signupTextMargin = '100%'; // Valeur initiale pour la marge gauche de "Signup"
  loginFormMargin = '0%'; // Valeur initiale pour la marge gauche du formulaire de login


  constructor(private router: Router) {}
  // Changer pour l'écran de connexion
  onLoginClick(): void {
    this.loginFormMargin = '0%'; // Réinitialiser la marge du formulaire
    this.loginTextMargin = '0%'; // Réinitialiser la marge du titre
    this.signupTextMargin = '100%'; // Déplacer le titre Signup hors de la vue
    this.router.navigate(['/home']);
  }

  // Changer pour l'écran d'inscription
  onSignupClick(): void {
    this.loginFormMargin = '-50%'; // Déplacer le formulaire à gauche
    this.loginTextMargin = '-50%'; // Déplacer le titre à gauche
    this.signupTextMargin = '0%'; // Réinitialiser la marge du titre Signup
  }

  // Changer de formulaire de connexion à inscription
  onSignupLinkClick(): void {
    this.onSignupClick(); // Simuler un clic sur le bouton "signup"
  }

}
