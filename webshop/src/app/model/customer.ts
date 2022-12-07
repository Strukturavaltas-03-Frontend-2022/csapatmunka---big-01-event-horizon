import { Validators } from '@angular/forms';
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

export const customerHeaderControls = [
  { key: 'id', label: '#', type: 'input', visible: false, validators: [] },
  {
    key: 'firstName',
    label: 'First Name',
    type: 'input',
    visible: true,
    validators: [Validators.pattern(/^[a-z ,.'-]+$/i), Validators.required],
    error: 'Must be set!',
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: 'input',
    visible: true,
    validators: [Validators.pattern(/^[a-z ,.'-]+$/i), Validators.required],
    error: 'Must be set!',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'input',
    visible: true,
    validators: [Validators.email, Validators.required],
    error: 'Must have valid email format!',
  },
  {
    key: 'addZip',
    label: 'ZIP Code',
    type: 'input',
    visible: true,
    validators: [Validators.pattern(/^[A-Z][1-9][A-Z]$/), Validators.required],
    error: 'Must have valid canadian zip format (A1A)!',
  },
  {
    key: 'addCountry',
    label: 'Country',
    options: ['Canada'],
    type: 'select',
    visible: true,
    validators: [Validators.required],
    error: 'Must be set!',
  },
  {
    key: 'addCity',
    label: 'City',
    type: 'input',
    visible: true,
    validators: [Validators.required],
    error: 'Must be set!',
  },
  {
    key: 'addStreet',
    label: 'Street',
    type: 'input',
    visible: true,
    validators: [
      Validators.pattern(/^\d{1,5}\s\w+[\s\w+]*$/),
      Validators.required,
    ],
    error: 'Must have valid canadian address format!',
  },
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
    validators: [Validators.required],
    error: 'Must be set!',
  },
  {
    key: 'active',
    label: 'Active',
    type: 'checkbox',
    visible: true,
    validators: [],
  },
];
