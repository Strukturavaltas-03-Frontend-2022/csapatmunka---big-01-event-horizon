import { Validators } from '@angular/forms';

export class Order {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  customerId: number = 0;
  productId: number = 0;
  amount: number = 0;
  status: string[] = [];
}

export const orderHeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false, validators: [] },
  {
    key: 'customerId',
    label: 'Customer#',
    type: 'input',
    visible: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.pattern(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/),

      ,
    ],
    error: 'Must be a valid id!',
  },
  {
    key: 'productId',
    label: 'Product#',
    type: 'input',
    visible: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.pattern(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/),

      ,
    ],
    error: 'Must be a valid id!',
  },
  {
    key: 'amount',
    label: 'Amount',
    type: 'input',
    visible: true,
    validators: [Validators.required, Validators.pattern(/^[1-5]$/)],
    error: 'Must be a number between 1-5!',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: ['new', 'paid', 'shipped'],
    visible: true,
    validators: [Validators.required],
    error: 'Must be set!',
  },
];
