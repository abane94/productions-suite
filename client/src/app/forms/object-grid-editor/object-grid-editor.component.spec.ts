import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectGridEditorComponent } from './object-grid-editor.component';

describe('GridEditorComponent', () => {
  let component: ObjectGridEditorComponent;
  let fixture: ComponentFixture<ObjectGridEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectGridEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectGridEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
