import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialControlItemComponent } from './material-control-item.component';

describe('MaterialControlItemComponent', () => {
  let component: MaterialControlItemComponent;
  let fixture: ComponentFixture<MaterialControlItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialControlItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
