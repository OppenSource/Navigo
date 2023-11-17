import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JourneyPage } from './journey.page';

describe('JourneyPage', () => {
  let component: JourneyPage;
  let fixture: ComponentFixture<JourneyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
