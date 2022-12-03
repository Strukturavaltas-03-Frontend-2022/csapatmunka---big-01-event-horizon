export class Order {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  customerId: number = 0;
  productId: number = 0;
  amount: number = 0;
  status: string[] = [];
}

export const orderHeaders: string[] = [
  'id',
  'customerId',
  'productId',
  'amount',
  'status',
];

export const orderHeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false },
  {
    key: 'customerId',
    label: 'Customer#',
    type: 'input',
    visible: true,
    disabled: true,
  },
  { key: 'amount', label: 'Amount', type: 'input', visible: true },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: ['new', 'paid', 'shipped'],
    visible: true,
  },
];
