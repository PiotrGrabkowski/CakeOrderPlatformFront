import { TestBed } from '@angular/core/testing';

import { DisplayingComponentsSmoothlyService } from './displaying-components-smoothly.service';

describe('DisplayingComponentsSmoothlyService', () => {
  let service: DisplayingComponentsSmoothlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayingComponentsSmoothlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
