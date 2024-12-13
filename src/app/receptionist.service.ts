import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receptionist } from './modele/Receptionist';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

 private baseUrl = 'http://localhost:8085/Receptionists';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les clients disponibles
  getAllReceptionists(): Observable<Receptionist[]> {
    return this.http.get<Receptionist[]>(this.baseUrl)
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
    return this.http.post<Receptionist>(this.baseUrl, receptionist);
  }


  updateReceptionist(receptionist: Receptionist): Observable<Receptionist> {
    return this.http.put<Receptionist>(`${this.baseUrl}/${receptionist.id}`, receptionist);
  }

  // Récupérer un utilisateur par son id
  getReceptionistById(id: number): Observable<Receptionist> {
    return this.http.get<Receptionist>(`${this.baseUrl}/${id}`);
  }

  deleteReceptionist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
