import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormsComponent } from './reservation-forms.component';

describe('ReservationFormsComponent', () => {
  let component: ReservationFormsComponent;
  let fixture: ComponentFixture<ReservationFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
