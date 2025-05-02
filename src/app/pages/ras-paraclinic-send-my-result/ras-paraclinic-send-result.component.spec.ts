import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasParaclinicSendMyResultComponent } from './ras-paraclinic-send-my-result.component';

describe('RasParaclinicSendResultComponent', () => {
  let component: RasParaclinicSendMyResultComponent;
  let fixture: ComponentFixture<RasParaclinicSendMyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasParaclinicSendMyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasParaclinicSendMyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
