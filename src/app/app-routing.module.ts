import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { ItinerariesComponent } from './itineraries/itineraries.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'travel-list', component: TravelListComponent },
  { path: 'itineraries', component: ItinerariesComponent },
  { path: 'expenses', component: TravelListComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
