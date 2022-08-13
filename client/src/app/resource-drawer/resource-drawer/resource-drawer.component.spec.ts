import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDrawerComponent } from './resource-drawer.component';

describe('ResourceDrawerComponent', () => {
  let component: ResourceDrawerComponent;
  let fixture: ComponentFixture<ResourceDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
