import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receptionist } from './modele/Receptionist';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

 private baseUrl = 'http://localhost:8888/receptionist-service/Administrator';

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

  constructor(private http: HttpClient) { }

  // Récupérer toutes les clients disponibles
  getAllReceptionists(): Observable<Receptionist[]> {
    const headers = this.createHeaders();
    console.log('En-têtes:', headers);
    return this.http.get<Receptionist[]>(this.baseUrl, { headers })
      .pipe(
        catchError(this.handleError) // Gestion des erreurs
      );
  }

  // Méthode privée pour gérer les erreurs HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Une erreur est survenue : ${error.message}`);
    return throwError('Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.');
  }


  addReceptionist(receptionist: Receptionist): Observable<Receptionist> {
    const headers = this.createHeaders();
    return this.http.post<Receptionist>(this.baseUrl, receptionist, { headers });
  }


  updateReceptionist(receptionist: Receptionist): Observable<Receptionist> {
    const headers = this.createHeaders();
    return this.http.put<Receptionist>(`${this.baseUrl}/${receptionist._id}`, receptionist, { headers });
  }

  // Récupérer un utilisateur par son id
  getReceptionistById(_id: string): Observable<Receptionist> {
    const headers = this.createHeaders();
    return this.http.get<Receptionist>(`${this.baseUrl}/${_id}`, { headers });
  }

  deleteReceptionist(_id: string): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${_id}`, { headers });
  }
}
