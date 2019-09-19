import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRiconsegnaComponent } from './form-riconsegna.component';

describe('FormRiconsegnaComponent', () => {
  let component: FormRiconsegnaComponent;
  let fixture: ComponentFixture<FormRiconsegnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRiconsegnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRiconsegnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
