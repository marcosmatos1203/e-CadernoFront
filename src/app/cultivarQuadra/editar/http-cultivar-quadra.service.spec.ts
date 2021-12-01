import { TestBed } from '@angular/core/testing';

import { HttpCultivarQuadraService } from './http-cultivar-quadra.service';

describe('HttpCultivarQuadraService', () => {
  let service: HttpCultivarQuadraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCultivarQuadraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
