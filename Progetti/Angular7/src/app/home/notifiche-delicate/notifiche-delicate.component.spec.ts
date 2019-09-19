import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificheDelicateComponent } from './notifiche-delicate.component';

describe('NotificheDelicateComponent', () => {
  let component: NotificheDelicateComponent;
  let fixture: ComponentFixture<NotificheDelicateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificheDelicateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificheDelicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
