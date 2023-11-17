import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusPage } from './bus.page';

describe('BusPage', () => {
  let component: BusPage;
  let fixture: ComponentFixture<BusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
