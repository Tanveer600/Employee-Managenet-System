import { TestBed } from '@angular/core/testing';

import { EmpproService } from './emppro.service';

describe('EmpproService', () => {
  let service: EmpproService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpproService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
