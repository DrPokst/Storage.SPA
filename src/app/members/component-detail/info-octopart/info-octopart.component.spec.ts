import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOctopartComponent } from './info-octopart.component';

describe('InfoOctopartComponent', () => {
  let component: InfoOctopartComponent;
  let fixture: ComponentFixture<InfoOctopartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoOctopartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoOctopartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
