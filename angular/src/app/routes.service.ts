import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getUuid(): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiURL = environment.apiUrl + 'generateUuid/';
      this.http
        .get(apiURL)
        .toPromise()
        .then(
          (success) => {
            resolve(success);
          },
          (msg) => {
            console.log(msg)
            reject(msg);
          }
        );
    });


  }

  postsolde(user: string | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiURL = environment.apiUrl + 'solde/';
      this.http
        .post(apiURL, {
          'uuid' : user
        })
        .toPromise()
        .then(
          (success) => {
            resolve(success);
          },
          (msg) => {
            console.log(msg)
            reject(msg);
          }
        );
    });

  }

  postconnexion(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiURL = environment.apiUrl + 'connexion/';
      this.http
        .post(apiURL, {
          'uuid' : id
        })
        .toPromise()
        .then(
          (success) => {
            resolve(success);
          },
          (msg) => {
            console.log(msg)
            reject(msg);
          }
        );
    });


  }


}

