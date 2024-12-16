import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RoomComponent } from './component/room/room.component';
import { BookComponent } from './component/book/book.component';

export const routes: Routes = [ 
    {path:"", component:HomeComponent},
    {path:"home", component:HomeComponent},
    {path:"room", component:RoomComponent},
    {path:"book", component:BookComponent}

];
