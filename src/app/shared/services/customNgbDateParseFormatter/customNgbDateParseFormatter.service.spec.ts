import { TestBed, inject } from '@angular/core/testing';

import { CustomNgbDateParseFormatter } from './customNgbDateParseFormatter.service';

describe('CustomNgbDateParseFormatter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomNgbDateParseFormatter]
    });
  });

  it('should be created', inject([CustomNgbDateParseFormatter], (service: CustomNgbDateParseFormatter) => {
    expect(service).toBeTruthy();
  }));
});
