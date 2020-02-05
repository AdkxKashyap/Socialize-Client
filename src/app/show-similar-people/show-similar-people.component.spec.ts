import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSimilarPeopleComponent } from './show-similar-people.component';

describe('ShowSimilarPeopleComponent', () => {
  let component: ShowSimilarPeopleComponent;
  let fixture: ComponentFixture<ShowSimilarPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSimilarPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSimilarPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
