import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyReportsComponent } from './corporate-company-reports.component';

describe('CorporateCompanyReportsComponent', () => {
  let component: CorporateCompanyReportsComponent;
  let fixture: ComponentFixture<CorporateCompanyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
