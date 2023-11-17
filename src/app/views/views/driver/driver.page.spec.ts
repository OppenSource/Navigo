import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverPage } from './driver.page';

describe('DriverPage', () => {
  let component: DriverPage;
  let fixture: ComponentFixture<DriverPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
