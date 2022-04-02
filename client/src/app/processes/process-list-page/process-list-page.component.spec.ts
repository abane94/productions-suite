import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessListPageComponent } from './process-list-page.component';

describe('ProcessListPageComponent', () => {
  let component: ProcessListPageComponent;
  let fixture: ComponentFixture<ProcessListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
