/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListByVarComponent } from './listByVar.component';

describe('ListByVarComponent', () => {
  let component: ListByVarComponent;
  let fixture: ComponentFixture<ListByVarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListByVarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
