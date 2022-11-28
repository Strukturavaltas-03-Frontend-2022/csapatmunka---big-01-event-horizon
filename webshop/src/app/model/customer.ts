import { Address } from './address';

export class Customer {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: Address = new Address();
  active: boolean = false;
}

export const customerHeaders = [
  'uniqueId',
  'id',
  'firstName',
  'lastName',
  'email',
  'address',
  'active',
];
