import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFiltrosHijo } from './catalogo-filtros-hijo';

describe('CatalogoFiltrosHijo', () => {
  let component: CatalogoFiltrosHijo;
  let fixture: ComponentFixture<CatalogoFiltrosHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoFiltrosHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoFiltrosHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
