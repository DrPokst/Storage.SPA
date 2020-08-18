import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelCardComponent } from './reel-card.component';

describe('ReelCardComponent', () => {
  let component: ReelCardComponent;
  let fixture: ComponentFixture<ReelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
