import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosHijo } from './filtros-hijo';

describe('FiltrosHijo', () => {
  let component: FiltrosHijo;
  let fixture: ComponentFixture<FiltrosHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
