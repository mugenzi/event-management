import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCreateComponent } from './guest-create.component';

describe('GuestCreateComponent', () => {
  let component: GuestCreateComponent;
  let fixture: ComponentFixture<GuestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
