import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFrontComponent } from './app-front.component';

describe('AppFrontComponent', () => {
  let component: AppFrontComponent;
  let fixture: ComponentFixture<AppFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
