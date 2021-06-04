import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersListPageComponent } from './customers-list-page.component';

describe('CustomersListPageComponent', () => {
  let component: CustomersListPageComponent;
  let fixture: ComponentFixture<CustomersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
