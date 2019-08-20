import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrumentoComponent } from './strumento.component';

describe('StrumentoComponent', () => {
  let component: StrumentoComponent;
  let fixture: ComponentFixture<StrumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
