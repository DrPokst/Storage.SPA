import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplistComponent } from './complist.component';

describe('ComplistComponent', () => {
  let component: ComplistComponent;
  let fixture: ComponentFixture<ComplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
