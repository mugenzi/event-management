import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFrontComponent } from './guest-front.component';

describe('GuestFrontComponent', () => {
  let component: GuestFrontComponent;
  let fixture: ComponentFixture<GuestFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
