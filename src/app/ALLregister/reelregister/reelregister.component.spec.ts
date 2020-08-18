import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelregisterComponent } from './reelregister.component';

describe('ReelregisterComponent', () => {
  let component: ReelregisterComponent;
  let fixture: ComponentFixture<ReelregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
