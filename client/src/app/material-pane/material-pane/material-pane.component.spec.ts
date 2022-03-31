import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPaneComponent } from './material-pane.component';

describe('MaterialPaneComponent', () => {
  let component: MaterialPaneComponent;
  let fixture: ComponentFixture<MaterialPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
