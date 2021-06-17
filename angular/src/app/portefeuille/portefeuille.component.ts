import { Component, OnInit } from '@angular/core';
import {RoutesService} from "../routes.service";

@Component({
  selector: 'app-portefeuille',
  templateUrl: './portefeuille.component.html',
  styleUrls: ['./portefeuille.component.css']
})
export class PortefeuilleComponent implements OnInit {
  user : string | undefined;
  solde: number;
  constructor(private routes: RoutesService) {
    this.user = localStorage.getItem('user')?.toString();
    this.solde = 0;
  }

  ngOnInit(): void {
    this.getsolde()
  }

  getsolde(): void{
    this.routes.postsolde(this.user).then(
      e => {
        this.solde = e.coins;
      }
    ).catch()
  }

}
