import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelCardDetailComponent } from './reel-card-detail.component';

describe('ReelCardDetailComponent', () => {
  let component: ReelCardDetailComponent;
  let fixture: ComponentFixture<ReelCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
