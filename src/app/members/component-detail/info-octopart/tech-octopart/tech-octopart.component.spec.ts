import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechOctopartComponent } from './tech-octopart.component';

describe('TechOctopartComponent', () => {
  let component: TechOctopartComponent;
  let fixture: ComponentFixture<TechOctopartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechOctopartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechOctopartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
