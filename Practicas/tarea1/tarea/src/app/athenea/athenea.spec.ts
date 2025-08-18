import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Athenea } from './athenea';

describe('Athenea', () => {
  let component: Athenea;
  let fixture: ComponentFixture<Athenea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Athenea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Athenea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
