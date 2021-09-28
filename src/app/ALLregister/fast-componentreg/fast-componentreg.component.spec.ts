/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FastComponentregComponent } from './fast-componentreg.component';

describe('FastComponentregComponent', () => {
  let component: FastComponentregComponent;
  let fixture: ComponentFixture<FastComponentregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastComponentregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastComponentregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
