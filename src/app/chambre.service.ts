import { Injectable } from '@angular/core';
import { Chambre } from './modele/Chambre';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {


   private baseUrl = 'http://localhost:5000/chambres';
 
   constructor(private http: HttpClient) { }
 
   // Récupérer toutes les clients disponibles
   getAllChambres(): Observable<Chambre[]> {
     return this.http.get<Chambre[]>(this.baseUrl)
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
     return this.http.post<Chambre>(this.baseUrl, chambre);
   }
 
 
   updateChambre(chambre: Chambre): Observable<Chambre> {
     return this.http.put<Chambre>(`${this.baseUrl}/${chambre.id}`, chambre);
   }
 
   // Récupérer un chambre par son id
   getChambreById(id: number): Observable<Chambre> {
     return this.http.get<Chambre>(`${this.baseUrl}/${id}`);
   }
 
   deleteChambre(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}`);
   }
}
