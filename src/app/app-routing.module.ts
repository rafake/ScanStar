import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlanetComponent } from './components/planet/planet.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'planets/:id', component: PlanetComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
