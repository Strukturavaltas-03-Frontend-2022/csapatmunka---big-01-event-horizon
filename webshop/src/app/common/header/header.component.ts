import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService, IMenuItem } from 'src/app/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  router: Router = inject(Router);
  route: string = '';

  url: string = '';
  menuItem: string = '';

  constructor() {}

  ngDoCheck(): void {
    this.url = this.router.url;
    this.menuItem = this.url
      .slice(this.url.lastIndexOf('/') + 1)
      .charAt(0)
      .toUpperCase()
      .concat(this.url.slice(this.url.lastIndexOf('/') + 1).slice(1));
  }

  ngOnInit(): void {}
}
