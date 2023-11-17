import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashbaordPage } from './dashbaord.page';

describe('DashbaordPage', () => {
  let component: DashbaordPage;
  let fixture: ComponentFixture<DashbaordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashbaordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
