import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceControlItemComponent } from './resource-control-item.component';

describe('ResourceControlItemComponent', () => {
  let component: ResourceControlItemComponent;
  let fixture: ComponentFixture<ResourceControlItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceControlItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
