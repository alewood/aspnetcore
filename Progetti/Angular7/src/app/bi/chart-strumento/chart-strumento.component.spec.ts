import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStrumentoComponent } from './chart-strumento.component';

describe('ChartStrumentoComponent', () => {
  let component: ChartStrumentoComponent;
  let fixture: ComponentFixture<ChartStrumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStrumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
