import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationChartComponent } from './ras-paraclinic-send-result.component';

describe('RasParaclinicSendResultComponent', () => {
  let component: OrganizationChartComponent;
  let fixture: ComponentFixture<OrganizationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
