import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemEditorComponent } from './line-item-editor.component';

describe('LineItemEditorComponent', () => {
  let component: LineItemEditorComponent;
  let fixture: ComponentFixture<LineItemEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineItemEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
