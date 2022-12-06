import { Validators } from '@angular/forms';

export class Bill {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  orderId: number = 0;
  amount: number = 0;
  status: string[] = [];
}

export const billHeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false, validators: [] },
  {
    key: 'orderId',
    label: 'Order#',
    type: 'input',
    visible: true,
    validators: [
      Validators.pattern(/^\d+$/),
      Validators.pattern(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/),
      Validators.required,
    ],
    error: 'Must be a valid id!',
  },
  {
    key: 'amount',
    label: 'Amount',
    type: 'input',
    visible: true,
    validators: [Validators.pattern(/^\d{5,}$/), Validators.required],
    error: 'Must be at least 10000 CAD!',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: ['paid', 'new'],
    visible: true,
    validators: [Validators.required],
    error: 'Must be set!',
  },
];
