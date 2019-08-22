import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrumentoViewComponent } from './strumento-view.component';

describe('StrumentoViewComponent', () => {
  let component: StrumentoViewComponent;
  let fixture: ComponentFixture<StrumentoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrumentoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrumentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
