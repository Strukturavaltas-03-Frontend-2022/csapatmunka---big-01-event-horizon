import { Category } from './category';

export class Product {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  name: string = '';
  type: string = '';
  category: Category = new Category();
  description: string = '';
  price: number = 0;
  featured: boolean = false;
  active: boolean = false;
}

export const productHeaders: string[] = [
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
