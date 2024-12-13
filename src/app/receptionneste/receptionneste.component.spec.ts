import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionnesteComponent } from './receptionneste.component';

describe('ReceptionnesteComponent', () => {
  let component: ReceptionnesteComponent;
  let fixture: ComponentFixture<ReceptionnesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionnesteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionnesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
