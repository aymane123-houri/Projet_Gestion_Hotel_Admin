import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'https://your-api-endpoint.com/reservations'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour supprimer une réservation
  deleteReservation(reservationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservationId}`);
  }
}
