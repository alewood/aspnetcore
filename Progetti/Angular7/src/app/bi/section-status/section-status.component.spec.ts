import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStatusComponent } from './section-status.component';

describe('SectionStatusComponent', () => {
  let component: SectionStatusComponent;
  let fixture: ComponentFixture<SectionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
