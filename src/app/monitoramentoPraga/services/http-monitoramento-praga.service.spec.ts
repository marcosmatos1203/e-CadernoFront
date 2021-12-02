import { TestBed } from '@angular/core/testing';

import { HttpMonitoramentoPragaService } from './http-monitoramento-praga.service';

describe('HttpMonitoramentoPragaService', () => {
  let service: HttpMonitoramentoPragaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMonitoramentoPragaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
