import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneStrumentiComponent } from './gestione-strumenti.component';

describe('GestioneStrumentiComponent', () => {
  let component: GestioneStrumentiComponent;
  let fixture: ComponentFixture<GestioneStrumentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneStrumentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneStrumentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
