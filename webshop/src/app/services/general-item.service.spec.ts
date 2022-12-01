import { TestBed } from '@angular/core/testing';

import { GeneralItemService } from './general-item.service';

describe('GeneralItemService', () => {
  let service: GeneralItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
