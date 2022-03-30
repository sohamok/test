import { TestBed } from '@angular/core/testing';

import { JointDesignService } from '@src/app/service/joint-design.service';

describe('JointDesignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JointDesignService = TestBed.get(JointDesignService);
    expect(service).toBeTruthy();
  });
});
