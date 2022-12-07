import { Component, inject, OnInit } from '@angular/core';
import { ConfigService, IMenuItem } from 'src/app/services/config.service';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  dataRelay: RelayDataService = inject(RelayDataService);
  config: ConfigService = inject(ConfigService);

  activeMenuItem: string = '';

  appName: string = this.config.appName;
  menuItems: IMenuItem[] = this.config.menuItems;

  ngOnInit(): void {}

  constructor() {}

  setType(type: string) {
    this.dataRelay.setType(type.toLowerCase());
  }
}
