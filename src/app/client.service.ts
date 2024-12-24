import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './modele/Client';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


 // private baseUrl = 'http://localhost:8081/Utilisateurs';
 private baseUrl = 'http://localhost:8888/user-service/Utilisateurs';
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
  getAllClients(): Observable<Client[]> {
    const headers = this.createHeaders();
    return this.http.get<Client[]>(this.baseUrl, { headers })
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
    const headers = this.createHeaders();
    return this.http.post<Client>(this.baseUrl, client, { headers });
  }


  updateClient(client: Client): Observable<Client> {
    const headers = this.createHeaders();
    return this.http.put<Client>(`${this.baseUrl}/${client.id}`, client, { headers });
  }

  // Récupérer un utilisateur par son id
  getClientById(id: number): Observable<Client> {
    const headers = this.createHeaders();
    return this.http.get<Client>(`${this.baseUrl}/${id}`, { headers });
  }

  deleteClient(id: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
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
