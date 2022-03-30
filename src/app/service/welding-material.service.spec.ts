import { TestBed } from '@angular/core/testing';

import { WeldingMaterialService } from '@src/app/service/welding-material.service';

describe('WeldingMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeldingMaterialService = TestBed.get(WeldingMaterialService);
    expect(service).toBeTruthy();
  });
});
