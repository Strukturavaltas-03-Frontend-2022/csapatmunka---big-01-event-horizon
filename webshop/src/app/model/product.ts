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

export const productHeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false },
  { key: 'name', label: 'Name', type: 'input', visible: true },
  { key: 'type', label: 'Type', type: 'input', visible: true },
  {
    key: 'catId',
    label: 'Category#',
    type: 'select',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    visible: false,
  },
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
    options: [
      'The most noticeable part of a hatchback is its hatch or a rear door that swings upward',
      'A sedan is a conventional example of a four-door passenger car',
      'A Sport Utility Vehicle (SUV) is defined by its off-road capabilities and roominess',
      'Crossovers have the practicality of an SUV but also come with superb fuel efficiency like hatchbacks do',
      'A convertible or a cabriolet is a vehicle that has a roof that can be removed or folded down',
      'The term coupe evokes the images of a compact sedan - a two-door car with a trunk and a fixed roof',
      'Comfort and safety - the most beneficial points promised by minivans still take on significant importance in the family car world',
      'A pick-up truck is a vehicle with a 2-door or 4-door cabin along with open cargo space',
      'Sports cars are two-seater convertibles that allow for open-air driving and have a sporty appearance',
      'American-made two-door sports coupes with powerful engines designed for high-performance driving',
    ],
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
