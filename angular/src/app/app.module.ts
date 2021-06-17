import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-rooting.module';
import { AppComponent } from './app.component';
import { UuidComponent } from './uuid/uuid.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule } from '@angular/forms';
import { MineComponent } from './mine/mine.component';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { EnvoyerComponent } from './envoyer/envoyer.component';
@NgModule({
  declarations: [
    AppComponent,
    UuidComponent,
    ConnexionComponent,
    MineComponent,
    PortefeuilleComponent,
    EnvoyerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
