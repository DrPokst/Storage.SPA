import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutReelComponent } from './put-reel.component';

describe('PutReelComponent', () => {
  let component: PutReelComponent;
  let fixture: ComponentFixture<PutReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
