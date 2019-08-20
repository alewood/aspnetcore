import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVolumeComponent } from './section-volume.component';

describe('SectionVolumeComponent', () => {
  let component: SectionVolumeComponent;
  let fixture: ComponentFixture<SectionVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
