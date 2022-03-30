import { TestBed } from '@angular/core/testing';

import { ShieldingGasService } from '@src/app/service/shielding-gas.service';

describe('ShieldingGasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShieldingGasService = TestBed.get(ShieldingGasService);
    expect(service).toBeTruthy();
  });
});
