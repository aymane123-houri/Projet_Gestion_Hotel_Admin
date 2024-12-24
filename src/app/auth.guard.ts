import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Vérifie si l'utilisateur est authentifié
  const user = localStorage.getItem('User'); // Suppose que l'utilisateur est stocké dans le localStorage

  if (user) {
    return true; // Autorise l'accès à la route
  } else {
    // Redirige vers la page de connexion
    router.navigate(['/login']);
    return false;
  }

    /*const router = inject(Router);

    // Vérifie si l'utilisateur est connecté
    const user = localStorage.getItem('User');
    if (!user) {
      router.navigate(['/login']);
      return false;
    }
  
    const userData = JSON.parse(user);
  
    // Vérifie si la route a un rôle requis
    const requiredRole = route.data?.['Receptionist'];
  
    if (requiredRole && userData.role !== requiredRole) {
      router.navigate(['/admin']); // Redirige vers une page non autorisée
      return false;
    }
  
    return true; // L'accès est autorisé*/
  
};
