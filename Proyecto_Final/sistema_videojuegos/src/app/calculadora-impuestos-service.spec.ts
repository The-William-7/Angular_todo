import { TestBed } from '@angular/core/testing';

import { CalculadoraImpuestosService } from './calculadora-impuestos-service';

describe('CalculadoraImpuestosService', () => {
  let service: CalculadoraImpuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraImpuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
