import { TestBed } from '@angular/core/testing';

import { DataGridHandlerService } from './data-grid-handler.service';

describe('DataGridHandlerService', () => {
  let service: DataGridHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGridHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
