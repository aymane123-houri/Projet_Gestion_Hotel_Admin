import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ChambreComponent } from './chambre/chambre.component';
import { LoginComponent } from './login/login.component';
import { ReceptionnesteComponent } from './receptionneste/receptionneste.component';
import { ClientComponent } from './client/client.component';


export const routes: Routes = [
    {path : '', component : HomeComponent},
    {path : 'admin', component : HomeComponent},
    {path : 'reservation', component : ReservationComponent},
    {path : 'chambre', component : ChambreComponent},
    {path : 'auth', component : LoginComponent},
    {path : 'reception', component : ReceptionnesteComponent},
    {path : 'client', component : ClientComponent},
    { path: 'edit-client/:id', component: ClientComponent },
    { path: 'add-client', component: ClientComponent }, 

];
