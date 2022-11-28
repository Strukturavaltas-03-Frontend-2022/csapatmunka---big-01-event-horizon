import { Component, OnInit } from '@angular/core';
import { ConfigService, IMenuItem } from 'src/app/services/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  appName: string = this.config.appName;
  menuItems: IMenuItem[] = this.config.menuItems;

  ngOnInit(): void {}

  constructor(private config: ConfigService) {}
}
