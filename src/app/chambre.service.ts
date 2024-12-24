import { Injectable } from '@angular/core';
import { Chambre } from './modele/Chambre';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {


   //private baseUrl = 'http://127.0.0.1:5000/chambres';
 private baseUrl = 'http://localhost:8888/chambre-service/chambres';
   constructor(private http: HttpClient) { }


   private getToken(): string | null {
    const user = localStorage.getItem('User');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.tokens?.Access_Token || null; // Retourne le token s'il existe
    }
    return null;
  }
  
  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  
 
   // Récupérer toutes les clients disponibles
   getAllChambres(): Observable<Chambre[]> {
    /*const user = localStorage.getItem('User');
    let accessToken = '';

    if (user) {
      const parsedUser = JSON.parse(user);
      accessToken = parsedUser.tokens.Access_Token; // Récupération du token
    }

    // Créer un en-tête avec le token si disponible
    let headers = new HttpHeaders();
    if (accessToken) {
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    }*/

      const headers = this.createHeaders();
      console.log('En-têtes:', headers);
    // Effectuer la requête GET avec les en-têtes
    return this.http.get<Chambre[]>(this.baseUrl, { headers })
      .pipe(
        catchError(this.handleError) // Gestion des erreurs
      );
   }
 
   // Méthode privée pour gérer les erreurs HTTP
   private handleError(error: HttpErrorResponse): Observable<never> {
     console.error(`Une erreur est survenue : ${error.message}`);
     return throwError('Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.');
   }
 
 
   addChambre(chambre: Chambre): Observable<Chambre> {
    const headers = this.createHeaders();
     return this.http.post<Chambre>(this.baseUrl, chambre, { headers });
   }
 
 
   updateChambre(chambre: Chambre): Observable<Chambre> {
    const headers = this.createHeaders();
     return this.http.put<Chambre>(`${this.baseUrl}/${chambre.id}`, chambre, { headers });
   }
 
   // Récupérer un chambre par son id
   getChambreById(id: number): Observable<Chambre> {
    const headers = this.createHeaders();
     return this.http.get<Chambre>(`${this.baseUrl}/${id}`, { headers });
   }
 
   deleteChambre(id: number): Observable<void> {
    const headers = this.createHeaders();
     return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
   }
   
}
