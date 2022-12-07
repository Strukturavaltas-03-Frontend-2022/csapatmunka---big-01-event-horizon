import { Component, EventEmitter, inject, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { ConfigService, IMenuItem } from 'src/app/services/config.service';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dataRelay: RelayDataService = inject(RelayDataService);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  config: ConfigService = inject(ConfigService);

  event$!: any;

  activeMenuItem: string = '';

  appName: string = this.config.appName;
  menuItems: IMenuItem[] = this.config.menuItems;

  constructor() {}

  ngOnInit(): void {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('list')) {
          this.activeMenuItem = event.url.slice(6);
        } else {
          this.activeMenuItem = event.url.slice(1);
        }
      }
    });
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  setType(type: string) {
    this.dataRelay.setType(type.toLowerCase());
  }
}
