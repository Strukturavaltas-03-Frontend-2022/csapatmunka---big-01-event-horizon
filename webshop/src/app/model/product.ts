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

export const HeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false },
  { key: 'name', label: 'Name', type: 'input', visible: true },
  { key: 'type', label: 'Type', type: 'input', visible: true },
  { key: 'catId', label: 'Category#', type: 'select', visible: false },
  {
    key: 'catName',
    label: 'Category Name',
    options: [
      'Hathcback',
      'Sedan',
      'SUV',
      'Crossover',
      'Convertible',
      'Coupe',
      'Minivan',
      'Pickup Truck',
      'Sports Car',
      'Muscle Car',
    ],
    type: 'select',
    visible: true,
  },
  {
    key: 'catDescription',
    label: 'Category Desc.',
    type: 'textarea',
    visible: false,
  },
  {
    key: 'description',
    label: 'Description',
    options: ['Used', 'Test', 'New'],
    type: 'select',
    visible: true,
  },
  { key: 'price', label: 'Price', type: 'input', visible: true },
  {
    key: 'featured',
    label: 'Featured',
    type: 'checkbox',
    visible: true,
  },
  { key: 'active', label: 'Active', type: 'checkbox', visible: true },
];
