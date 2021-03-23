import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThridstepComponent } from './thridstep.component';

describe('ThridstepComponent', () => {
  let component: ThridstepComponent;
  let fixture: ComponentFixture<ThridstepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThridstepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThridstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
