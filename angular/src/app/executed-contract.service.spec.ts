import { TestBed } from '@angular/core/testing';

import { ExecutedContractService } from './executed-contract.service';

describe('ExecutedContractService', () => {
  let service: ExecutedContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutedContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
