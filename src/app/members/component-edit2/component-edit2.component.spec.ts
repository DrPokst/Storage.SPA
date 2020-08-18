import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentEdit2Component } from './component-edit2.component';

describe('ComponentEdit2Component', () => {
  let component: ComponentEdit2Component;
  let fixture: ComponentFixture<ComponentEdit2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentEdit2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentEdit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
