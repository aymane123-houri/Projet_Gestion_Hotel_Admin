import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ChambreComponent } from './chambre/chambre.component';
import { LoginComponent } from './login/login.component';
import { ReceptionnesteComponent } from './receptionneste/receptionneste.component';
import { ClientComponent } from './client/client.component';
import { ReservationFormsComponent } from './reservation-forms/reservation-forms.component';
import { PaymentComponent } from './payment/payment.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
   /* { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {path : 'admin', component : HomeComponent, canActivate: [authGuard]},
    {path : 'reservation', component : ReservationComponent,canActivate: [authGuard]},
    {path : 'chambre', component : ChambreComponent,canActivate: [authGuard]},
    {path : 'reception', component : ReceptionnesteComponent,canActivate: [authGuard]},
    {path : 'client', component : ClientComponent,canActivate: [authGuard]},
    { path: 'edit-client/:id', component: ClientComponent,canActivate: [authGuard] },
    { path: 'add-client', component: ClientComponent,canActivate: [authGuard] }, 
    { path: 'form_reservation/:id', component: ReservationFormsComponent,canActivate: [authGuard] }, 
    { path: 'payment', component: PaymentComponent },*/

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {path : 'admin', component : HomeComponent},
    {path : 'reservation', component : ReservationComponent},
    {path : 'chambre', component : ChambreComponent},
    {path : 'reception', component : ReceptionnesteComponent},
    {path : 'client', component : ClientComponent},
    { path: 'edit-client/:id', component: ClientComponent},
    { path: 'add-client', component: ClientComponent }, 
    { path: 'form_reservation/:id', component: ReservationFormsComponent }, 
    { path: 'payment', component: PaymentComponent },
    
];
