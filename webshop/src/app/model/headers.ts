export class HeaderList {
  [key: string]: any;
  products: Array<string> = [
    'id',
    'name',
    'type',
    'catId',
    'catName',
    'catDescription',
    'description',
    'price',
    'featured',
    'active',
  ];
  customers: Array<string> = [
    'id',
    'firstName',
    'lastName',
    'email',
    'addZip',
    'addCountry',
    'addCity',
    'addStreet',
    'addNotes',
    'active',
  ];
  orders: Array<string> = ['id', 'customerId', 'productId', 'amount', 'status'];
  bills: Array<string> = ['id', 'orderId', 'amount', 'status'];
}
