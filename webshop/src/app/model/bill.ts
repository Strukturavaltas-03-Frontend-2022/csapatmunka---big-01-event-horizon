export class Bill {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  orderId: number = 0;
  amount: number = 0;
  status: string[] = [];
}

export const billHeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false },
  { key: 'orderId', label: 'Order#', type: 'input', visible: true },
  { key: 'amount', label: 'Amount', type: 'input', visible: true },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: ['paid', 'new'],
    visible: true,
  },
];
