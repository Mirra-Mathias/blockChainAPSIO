import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UuidComponent} from "./uuid/uuid.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {MineComponent} from "./mine/mine.component";
import {PortefeuilleComponent} from "./portefeuille/portefeuille.component";


const appRoutes: Routes = [
  { path: 'generateuuid', component: UuidComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'mine', component: MineComponent},
  { path: 'solde', component: PortefeuilleComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
