/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BOMComponent } from './BOM.component';

describe('BOMComponent', () => {
  let component: BOMComponent;
  let fixture: ComponentFixture<BOMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
