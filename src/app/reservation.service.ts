import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Reservation } from './modele/Reservation';
import { Chambre } from './modele/Chambre';
import { ReservationData } from './modele/ReservationData';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8087/Reservations';

  constructor(private http: HttpClient) {}


// Méthode pour récupérer les chambres disponibles
getChambresDisponibles(dateDebut: string, dateFin: string, nombreAdulte: number, nombreEnfant: number): Observable<Chambre[]> {
  const params = {
    dateDebut,
    dateFin,
    nombreAdulte: nombreAdulte.toString(),
    nombreEnfant: nombreEnfant.toString()
  };
  return this.http.get<Chambre[]>(`${this.baseUrl}/chambres-disponibles`, { params });
}




  //`${this.baseUrl}/${id}`
    getAllReservation(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(this.baseUrl)
        .pipe(
          catchError(this.handleError) // Gestion des erreurs
        );
    }
      // Méthode privée pour gérer les erreurs HTTP
      private handleError(error: HttpErrorResponse): Observable<never> {
        console.error(`Une erreur est survenue : ${error.message}`);
        return throwError('Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.');
      }
    
      private apiUrl = 'http://127.0.0.1:5000';
      getAllChambres(): Observable<Chambre[]> {
        return this.http.get<Chambre[]>(`${this.apiUrl}/chambres`);
      }
    

addReservation(reservationData: ReservationData): Observable<ReservationData> {
    return this.http.post<ReservationData>(this.baseUrl, reservationData);
}
updateReservation(reservationData: ReservationData): Observable<ReservationData> {
return this.http.put<ReservationData>(`${this.baseUrl}/${reservationData.id}`, reservationData);
}
      
deleteReservation(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }
}
