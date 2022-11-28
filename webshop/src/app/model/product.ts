export class Product {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  name: string = '';
  type: string = '';
  catId: number = 0;
  description: string = '';
  price: number = 0;
  featured: boolean = false;
  active: boolean = false;
}

export const productHeaders: string[] = [
  'uniqueId',
  'id',
  'name',
  'type',
  'catId',
  'description',
  'price',
  'featured',
  'active',
];
