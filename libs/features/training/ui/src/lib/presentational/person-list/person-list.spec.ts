import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonList } from './person-list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PersonList', () => {
  let component: PersonList;
  let fixture: ComponentFixture<PersonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonList],
    })
      .overrideComponent(PersonList, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PersonList);
    fixture.componentRef.setInput('people', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
