import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showSpinner: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.showSpinner = false;
  }
}
