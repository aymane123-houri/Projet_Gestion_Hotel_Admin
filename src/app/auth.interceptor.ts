import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {
        console.log('AuthInterceptor instancié.');
      }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("AuthInterceptor appelé.");
        const user = localStorage.getItem('User');
        let accessToken = '';
    

          const parsedUser = JSON.parse(user!);
          accessToken = parsedUser.tokens.Access_Token;
          console.log("Access Token:", accessToken);
        
    
        if (accessToken) {
          const cloned = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          return next.handle(cloned);
        }
    
        return next.handle(request);
      }
    
}
