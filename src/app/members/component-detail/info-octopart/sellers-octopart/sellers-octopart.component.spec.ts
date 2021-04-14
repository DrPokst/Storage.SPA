import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersOctopartComponent } from './sellers-octopart.component';

describe('SellersOctopartComponent', () => {
  let component: SellersOctopartComponent;
  let fixture: ComponentFixture<SellersOctopartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersOctopartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersOctopartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
