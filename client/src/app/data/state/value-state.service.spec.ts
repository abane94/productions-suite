import { TestBed } from '@angular/core/testing';

import { ValueStateService } from './value-state.service';

describe('ValueStateService', () => {
  let service: ValueStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
