import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsDetailsPage } from './cars-details.page';

describe('CarsDetailsPage', () => {
  let component: CarsDetailsPage;
  let fixture: ComponentFixture<CarsDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
