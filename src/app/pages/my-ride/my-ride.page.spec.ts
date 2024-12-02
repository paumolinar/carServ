import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRidePage } from './my-ride.page';

describe('MyRidePage', () => {
  let component: MyRidePage;
  let fixture: ComponentFixture<MyRidePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
