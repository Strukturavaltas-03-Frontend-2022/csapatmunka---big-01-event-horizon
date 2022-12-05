import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService, IMenuItem } from 'src/app/services/config.service';
import { GeneralItemService } from 'src/app/services/general-item.service';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  dataRelay: RelayDataService = inject(RelayDataService);
  generalItemService: GeneralItemService = inject(GeneralItemService);
  router: Router = inject(Router);
  config: ConfigService = inject(ConfigService);

  showSpinner: boolean = false;
  clicked: boolean[] = [false, false, false, false];
  clickedHome: boolean = true;

  appName: string = this.config.appName;
  //menuItems: IMenuItem[] = this.config.menuItems;
  menuItems: string[] = ['Products', 'Customers', 'Orders', 'Bills'];
  menuIcons: string[] = [
    'fa-archive',
    'fa-user',
    'fa-credit-card-alt',
    'fa-money',
  ];

  ngOnInit(): void {}

  constructor() {}

  onHomeClicked() {
    for (let i = 0; i < this.clicked.length; i++) {
      this.clicked[i] = false;
    }
    this.clickedHome = true;
  }

  onClickMenuItem(event: Event, index: number) {
    for (let i = 0; i < this.clicked.length; i++) {
      this.clicked[i] = false;
    }
    this.clicked[index] = true;
    this.clickedHome = false;
    const target = event.target as HTMLInputElement;
    const menuItem = target.children[1].innerHTML.toLowerCase();

    this.dataRelay.setType(menuItem);

    switch (menuItem) {
      case 'products':
        {
          this.router.navigate(['/list/products']);
        }
        break;
      case 'customers':
        {
          this.router.navigate(['/list/customers']);
        }
        break;
      case 'orders':
        {
          this.router.navigate(['/list/orders']);
        }
        break;
      case 'bills':
        {
          this.router.navigate(['/list/bills']);
        }
        break;
    }
  }
}
