import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeReelComponent } from './take-reel.component';

describe('TakeReelComponent', () => {
  let component: TakeReelComponent;
  let fixture: ComponentFixture<TakeReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
