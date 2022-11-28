import { TestBed } from '@angular/core/testing';

import { RelayDataService } from './relay-data.service';

describe('RelayDataService', () => {
  let service: RelayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
