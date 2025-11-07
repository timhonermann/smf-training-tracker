import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from './person';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Person', () => {
  let component: Person;
  let fixture: ComponentFixture<Person>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Person, ReactiveFormsModule, FormsModule],
    })
      .overrideComponent(Person, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Person);
    fixture.componentRef.setInput('person', {
      firstName: '',
      lastName: '',
      totalTrainings: 0,
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
