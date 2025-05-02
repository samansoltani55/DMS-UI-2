import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEquipmentsComponent } from './modal-add-equipments.component';

describe('ModalAddEquipmentsComponent', () => {
  let component: ModalAddEquipmentsComponent;
  let fixture: ComponentFixture<ModalAddEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEquipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
