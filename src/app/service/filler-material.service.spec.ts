import { TestBed } from '@angular/core/testing';

import { FillerMaterialService } from '@src/app/service/filler-material.service';

describe('FillerMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FillerMaterialService = TestBed.get(FillerMaterialService);
    expect(service).toBeTruthy();
  });
});
