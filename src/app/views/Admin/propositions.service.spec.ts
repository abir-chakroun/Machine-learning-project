import { TestBed } from '@angular/core/testing';

import { PropositionsService } from './propositions.service';

describe('PropositionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropositionsService = TestBed.get(PropositionsService);
    expect(service).toBeTruthy();
  });
});
