import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Reservation } from './modele/Reservation';
import { Chambre } from './modele/Chambre';
import { ReservationData } from './modele/ReservationData';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //private baseUrl = 'http://localhost:8087/Reservations';
  private baseUrl = 'http://localhost:8888/reservation-servicee/Reservations';
  constructor(private http: HttpClient) {}

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
  

// Méthode pour récupérer les chambres disponibles
getChambresDisponibles(dateDebut: string, dateFin: string, nombreAdulte: number, nombreEnfant: number): Observable<Chambre[]> {
  const params = {
    dateDebut,
    dateFin,
    nombreAdulte: nombreAdulte.toString(),
    nombreEnfant: nombreEnfant.toString()
  };
  const headers = this.createHeaders();
  //return this.http.get<Chambre[]>(`${this.baseUrl}/chambres-disponibles`, { params });
  return this.http.get<Chambre[]>(`${this.baseUrl}/chambres-disponibles`, { 
    params,
    headers // Ajoutez headers à la requête
  });
}




  //`${this.baseUrl}/${id}`
    getAllReservation(): Observable<ReservationData[]> {
      const headers = this.createHeaders();
      return this.http.get<ReservationData[]>(this.baseUrl, { headers })
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
  const headers = this.createHeaders();
    return this.http.post<ReservationData>(this.baseUrl, reservationData, { headers });
}
updateReservation(reservationData: ReservationData): Observable<ReservationData> {
  const headers = this.createHeaders();
return this.http.put<ReservationData>(`${this.baseUrl}/${reservationData.id}`, reservationData, { headers });
}
      
deleteReservation(id: number): Observable<void> {
  const headers = this.createHeaders();
     return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
 }

 sendEmail(reservationId: number): Observable<void> {
  const url = `http://localhost:8088/Notification/send-email/${reservationId}`;
  return this.http.post<void>(url, {}); // Vous pouvez passer un payload vide
}

}
