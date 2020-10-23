import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastRegComponent } from './fast-reg.component';

describe('FastRegComponent', () => {
  let component: FastRegComponent;
  let fixture: ComponentFixture<FastRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
