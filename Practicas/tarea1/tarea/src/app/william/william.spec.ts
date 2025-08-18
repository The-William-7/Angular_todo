import { ComponentFixture, TestBed } from '@angular/core/testing';

import { William } from './william';

describe('William', () => {
  let component: William;
  let fixture: ComponentFixture<William>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [William]
    })
    .compileComponents();

    fixture = TestBed.createComponent(William);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
