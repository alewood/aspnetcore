import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrumentoSidebarComponent } from './strumento-sidebar.component';

describe('StrumentoSidebarComponent', () => {
  let component: StrumentoSidebarComponent;
  let fixture: ComponentFixture<StrumentoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrumentoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrumentoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
