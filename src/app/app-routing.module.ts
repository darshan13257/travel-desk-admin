import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { ItinerariesComponent } from './itineraries/itineraries.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'travel-list', component: TravelListComponent },
  { 
    path: 'travel-form', 
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: TravelDetailsComponent },
      { path: 'itineraries', component: ItinerariesComponent },
      // Add expenses component route here when ready
    ]
  },
  // Redirect unknown paths to login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
