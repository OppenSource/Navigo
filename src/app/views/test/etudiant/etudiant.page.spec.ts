import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtudiantPage } from './etudiant.page';

describe('EtudiantPage', () => {
  let component: EtudiantPage;
  let fixture: ComponentFixture<EtudiantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EtudiantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
