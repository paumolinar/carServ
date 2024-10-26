import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBalancePage } from './add-balance.page';

describe('AddBalancePage', () => {
  let component: AddBalancePage;
  let fixture: ComponentFixture<AddBalancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
