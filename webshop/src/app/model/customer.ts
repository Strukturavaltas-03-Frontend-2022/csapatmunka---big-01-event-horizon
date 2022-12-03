import { Address } from './address';

export class Customer {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: Address = new Address();
  active: boolean = false;
}

export const customerHeaders = [
  'id',
  'firstName',
  'lastName',
  'email',
  'addZip',
  'addCountry',
  'addCity',
  'addStreet',
  'addNotes'
  'active',
];

export const customerHeadersControls = [
  { key: 'id', label: '#', type: 'input', visible: false },
  { key: 'firstName', label: 'First Name', type: 'input', visible: true },
  { key: 'lastName', label: 'Last Name', type: 'input', visible: true },
  { key: 'email', label: 'Email', type: 'input', visible: true },
  { key: 'addZip', label: 'ZIP Code', type: 'input', visible: true },
  {
    key: 'addCountry',
    label: 'Country',
    options: ['Canada'],
    type: 'select',
    visible: true,
  },
  { key: 'addCity', label: 'City', type: 'input', visible: true },
  { key: 'addStreet', label: 'Street', type: 'input', visible: true },
  {
    key: 'addNotes',
    label: 'Notes',
    options: [
      'Dog goes woof',
      'Cat goes meow',
      'Bird goes tweet',
      'Mouse goes squeek',
      'Cow goes moo',
      'Frog goes croak',
      'Elephant goes toot',
      'Ducks say quack',
      'Fish go blub',
      'Seal goes ow',
      'What does the fox say',
    ],
    type: 'select',
    visible: true,
  },
  { key: 'active', label: 'Active', type: 'checkbox', visible: true },
];
