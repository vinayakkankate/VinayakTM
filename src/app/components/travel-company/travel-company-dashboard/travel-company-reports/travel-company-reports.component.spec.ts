import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCompanyReportsComponent } from './travel-company-reports.component';

describe('TravelCompanyReportsComponent', () => {
  let component: TravelCompanyReportsComponent;
  let fixture: ComponentFixture<TravelCompanyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelCompanyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelCompanyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
