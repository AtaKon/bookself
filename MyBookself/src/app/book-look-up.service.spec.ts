import { TestBed } from '@angular/core/testing';

import { BookLookUpService } from './book-look-up.service';

describe('BookLookUpService', () => {
  let service: BookLookUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookLookUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
