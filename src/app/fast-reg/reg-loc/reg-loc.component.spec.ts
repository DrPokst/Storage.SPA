/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegLocComponent } from './reg-loc.component';

describe('RegLocComponent', () => {
  let component: RegLocComponent;
  let fixture: ComponentFixture<RegLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
