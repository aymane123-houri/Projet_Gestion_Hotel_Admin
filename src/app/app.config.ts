import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client.service';
import { ChambreService } from './chambre.service';
import { ReceptionistService } from './receptionist.service';
import { ReservationService } from './reservation.service';

export const appConfig: ApplicationConfig = {
  //providers: [provideRouter(routes), provideClientHydration()]
  providers: [
    provideRouter(routes), provideClientHydration(),provideHttpClient(),provideHttpClient (withFetch()), provideAnimations(),FormsModule,ClientService,ChambreService,ReceptionistService,ReservationService

  ]

};
