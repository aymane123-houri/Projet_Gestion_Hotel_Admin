import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './modele/Client';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private baseUrl = 'http://localhost:8081/Utilisateurs';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les clients disponibles
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError) // Gestion des erreurs
      );
  }

  // Méthode privée pour gérer les erreurs HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Une erreur est survenue : ${error.message}`);
    return throwError('Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.');
  }


  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }


  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${client.id}`, client);
  }

  // Récupérer un utilisateur par son id
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  generateRandomPassword(length: number = 12): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
}
