import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentPage } from './student.page';

describe('StudentPage', () => {
  let component: StudentPage;
  let fixture: ComponentFixture<StudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
