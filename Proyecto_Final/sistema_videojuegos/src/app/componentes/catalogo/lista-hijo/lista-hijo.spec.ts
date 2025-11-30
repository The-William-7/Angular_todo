import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHijo } from './lista-hijo';

describe('ListaHijo', () => {
  let component: ListaHijo;
  let fixture: ComponentFixture<ListaHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
