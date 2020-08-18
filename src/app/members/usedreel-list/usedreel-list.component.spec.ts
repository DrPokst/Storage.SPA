import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedreelListComponent } from './usedreel-list.component';

describe('UsedreelListComponent', () => {
  let component: UsedreelListComponent;
  let fixture: ComponentFixture<UsedreelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedreelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedreelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
