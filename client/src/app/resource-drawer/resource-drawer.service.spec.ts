import { TestBed } from '@angular/core/testing';

import { ResourceDrawerService } from './resource-drawer.service';

describe('ResourceDrawerService', () => {
  let service: ResourceDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
