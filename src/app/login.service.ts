import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private apiUrl = 'http://localhost:9996/login';

  constructor(private http : HttpClient) { }

  public login(email: string, password: string, role:string):Observable<any>{
    const body = {
      "email": email,
      "password": password,
      "role":role
    }
    return this.http.post<any>(this.apiUrl, body);
  }

  public signup(nom: string, prenom: string, email: string, tel: string, address: string, cni: string, password: string,role:string):Observable<any>{
    const body = {
      "nom": nom,
      "prenom": prenom,
      "email": email,
      "telephone": tel,
      "adresse": address,
      "cni": cni,
      "password": password,
      "role":role,
    }
    return this.http.post<any>('http://localhost:8085/Administrator', body)
    //return this.http.post<any>('http://localhost:8888/user-service/Utilisateurs/signup', body)
  }

  public getUser(email: string):Observable<any>{
    return this.http.get<any>(`http://localhost:8888/receptionist-service/Administrator/email/${email}`);
  }
}
