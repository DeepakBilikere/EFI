import { TestBed, inject } from '@angular/core/testing';

import { OrderActivateService } from './order-activate.service';

describe('OrderActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderActivateService]
    });
  });

  it('should be created', inject([OrderActivateService], (service: OrderActivateService) => {
    expect(service).toBeTruthy();
  }));
});
