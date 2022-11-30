export class Bill {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  orderId: number = 0;
  amount: number = 0;
  status: string[] = [];
}

export const billHeaders: string[] = [
  'uniqueId',
  'id',
  'orderId',
  'amount',
  'status',
];
