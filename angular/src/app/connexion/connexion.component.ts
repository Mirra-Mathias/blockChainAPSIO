import { Component, OnInit } from '@angular/core';
import {RoutesService} from "../routes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  value: string;
  user : string | undefined;
  constructor(private routes: RoutesService, private router: Router) {
    this.value = "";
    this.user = localStorage.getItem('user')?.toString();
    console.log(this.user)
  }
  ngOnInit(): void {

  }

  login(): void {
    this.routes.postconnexion(this.value)
      .then(value => {
        console.log(value);
        localStorage.setItem('user', value.uuid);
        location.reload();
      })
      .catch()
  }
}
