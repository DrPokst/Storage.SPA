import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentregisterComponent } from './componentregister.component';

describe('ComponentregisterComponent', () => {
  let component: ComponentregisterComponent;
  let fixture: ComponentFixture<ComponentregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
