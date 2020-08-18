import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureloginComponent } from './azurelogin.component';

describe('AzureloginComponent', () => {
  let component: AzureloginComponent;
  let fixture: ComponentFixture<AzureloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzureloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzureloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
