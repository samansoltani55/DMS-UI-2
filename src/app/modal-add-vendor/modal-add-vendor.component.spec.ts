import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddVendorComponent } from './modal-add-vendor.component';

describe('ModalAddOrgComponent', () => {
  let component: ModalAddVendorComponent;
  let fixture: ComponentFixture<ModalAddVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
