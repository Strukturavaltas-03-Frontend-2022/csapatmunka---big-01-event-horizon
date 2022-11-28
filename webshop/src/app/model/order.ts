export class Order {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  customerId: number = 0;
  productId: number = 0;
  amount: number = 0;
  status: string[] = [];
}
