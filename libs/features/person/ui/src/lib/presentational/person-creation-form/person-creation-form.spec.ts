import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonCreationForm } from './person-creation-form';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { MatSelect } from '@angular/material/select';

describe('PersonCreationForm', () => {
  let component: PersonCreationForm;
  let fixture: ComponentFixture<PersonCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCreationForm],
    })
      .overrideComponent(PersonCreationForm, {
        set: {
          imports: [MockComponent(MatSelect)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PersonCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
