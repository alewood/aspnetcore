import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniVicineComponent } from './prenotazioni-vicine.component';

describe('PrenotazioniVicineComponent', () => {
  let component: PrenotazioniVicineComponent;
  let fixture: ComponentFixture<PrenotazioniVicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioniVicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioniVicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
