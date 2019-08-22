import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextParseComponent } from './text-parse.component';

describe('TextParseComponent', () => {
  let component: TextParseComponent;
  let fixture: ComponentFixture<TextParseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextParseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextParseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
