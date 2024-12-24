import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client.service';
import { ChambreService } from './chambre.service';
import { ReceptionistService } from './receptionist.service';
import { ReservationService } from './reservation.service';
import { AuthInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {

  //providers: [provideRouter(routes), provideClientHydration()]
  providers: [
    provideRouter(routes), provideClientHydration(),provideHttpClient(),provideHttpClient (withFetch()), provideAnimations(),FormsModule,HttpClientModule,ClientService,ChambreService,ReceptionistService,ReservationService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ]

  

};
