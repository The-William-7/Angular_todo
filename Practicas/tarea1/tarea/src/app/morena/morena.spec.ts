import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Morena } from './morena';

describe('Morena', () => {
  let component: Morena;
  let fixture: ComponentFixture<Morena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Morena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Morena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
