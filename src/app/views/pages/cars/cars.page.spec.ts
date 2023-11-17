import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsPage } from './cars.page';

describe('CarsPage', () => {
  let component: CarsPage;
  let fixture: ComponentFixture<CarsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
