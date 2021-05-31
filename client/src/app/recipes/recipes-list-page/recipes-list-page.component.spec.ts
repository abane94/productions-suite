import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesListPageComponent } from './recipes-list-page.component';

describe('RecipesListPageComponent', () => {
  let component: RecipesListPageComponent;
  let fixture: ComponentFixture<RecipesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
