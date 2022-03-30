import { TestBed } from '@angular/core/testing';

import { WeldingSequenceService } from '@src/app/service/welding-sequence.service';

describe('WeldingSequenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeldingSequenceService = TestBed.get(WeldingSequenceService);
    expect(service).toBeTruthy();
  });
});
