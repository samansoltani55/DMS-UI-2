import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasParaclinicRegisterComponent } from './ras-paraclinic-register.component';

describe('RasParaclinicSendResultComponent', () => {
  let component: RasParaclinicRegisterComponent;
  let fixture: ComponentFixture<RasParaclinicRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasParaclinicRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasParaclinicRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
