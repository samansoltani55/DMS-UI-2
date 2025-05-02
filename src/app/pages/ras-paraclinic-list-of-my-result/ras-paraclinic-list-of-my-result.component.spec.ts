import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasParaclinicListOfMyResultComponent } from './ras-paraclinic-list-of-my-result.component';

describe('RasParaclinicSendResultComponent', () => {
  let component: RasParaclinicListOfMyResultComponent;
  let fixture: ComponentFixture<RasParaclinicListOfMyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasParaclinicListOfMyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasParaclinicListOfMyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
