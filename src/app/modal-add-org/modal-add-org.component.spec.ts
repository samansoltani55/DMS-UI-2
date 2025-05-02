import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrgComponent } from './modal-add-org.component';

describe('ModalAddOrgComponent', () => {
  let component: ModalAddOrgComponent;
  let fixture: ComponentFixture<ModalAddOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
