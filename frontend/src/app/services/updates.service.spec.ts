import { TestBed } from '@angular/core/testing';

import { UpdatesService } from './updates.service';

describe('UpdatesServiceService', () => {
  let service: UpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
