import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelsListComponent } from './reels-list.component';

describe('ReelsListComponent', () => {
  let component: ReelsListComponent;
  let fixture: ComponentFixture<ReelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
