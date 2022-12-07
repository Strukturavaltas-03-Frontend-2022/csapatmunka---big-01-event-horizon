import { Injectable } from '@angular/core';

export interface IMenuItem {
  text: string;
  link: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  appName: string = 'Car Retail Database';

  menuItems: IMenuItem[] = [
    { text: 'Dashboard', link: '/dashboard', icon: 'fa-dashboard' },
    { text: 'Products', link: '/list/products', icon: 'fa-archive' },
    { text: 'Customers', link: '/list/customers', icon: 'fa-user' },
    { text: 'Orders', link: '/list/orders', icon: 'fa-credit-card-alt' },
    { text: 'Bills', link: '/list/bills', icon: 'fa-money' },
  ];

  constructor() {}
}
