import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  user = localStorage.getItem('user')?.toString();

  deconnexion() {
    localStorage.removeItem('user');
    location.reload();
  }
}
