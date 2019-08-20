import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPrenotazioniComponent } from './section-prenotazioni.component';

describe('SectionPrenotazioniComponent', () => {
  let component: SectionPrenotazioniComponent;
  let fixture: ComponentFixture<SectionPrenotazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPrenotazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
