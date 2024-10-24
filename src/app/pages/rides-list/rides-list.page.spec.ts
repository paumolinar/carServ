import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RidesListPage } from './rides-list.page';

describe('RidesListPage', () => {
  let component: RidesListPage;
  let fixture: ComponentFixture<RidesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RidesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
