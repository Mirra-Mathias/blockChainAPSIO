import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../routes.service';

export interface Uuid {
  value?: number;
  load: boolean;
}

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.css']
})

export class UuidComponent implements OnInit {

  constructor(private routes: RoutesService) { }

  public uuid: Uuid = {
    load: false
  }

  ngOnInit(): void {
  }

  generateUuid(): void {
    this.uuid.load = true;

    this.routes.getUuid()
      .then(
        value => {
          this.uuid.value = value;
          this.uuid.load = false;
        }
      )
      .catch(
        value => {
          this.uuid.load = false;
        }
      )
  }

}
