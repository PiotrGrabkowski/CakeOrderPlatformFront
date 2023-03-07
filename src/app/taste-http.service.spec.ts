import { TestBed } from '@angular/core/testing';

import { TasteHttpService } from './taste-http.service';

describe('TasteHttpService', () => {
  let service: TasteHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasteHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
