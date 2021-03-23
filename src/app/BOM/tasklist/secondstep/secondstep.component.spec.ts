import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondstepComponent } from './secondstep.component';

describe('SecondstepComponent', () => {
  let component: SecondstepComponent;
  let fixture: ComponentFixture<SecondstepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondstepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
