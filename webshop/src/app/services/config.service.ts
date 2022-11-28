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
    { text: 'Home', link: '/', icon: 'home' },
    { text: 'List', link: '/list' },
    //{ text: 'Editor', link: '/admin' },
  ];

  constructor() {}
}
