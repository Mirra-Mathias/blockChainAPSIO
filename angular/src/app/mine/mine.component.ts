import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  user : string | undefined;
  constructor() {
    this.user = localStorage.getItem('user')?.toString();
  }

  ngOnInit(): void {
  }

}
