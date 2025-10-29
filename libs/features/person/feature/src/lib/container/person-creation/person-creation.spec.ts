import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonCreation } from './person-creation';
import { PersonStore } from '@stt/features/person/domain';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';

describe('PersonCreation', () => {
  let component: PersonCreation;
  let fixture: ComponentFixture<PersonCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCreation],
      providers: [MockProvider(PersonStore)],
    })
      .overrideComponent(PersonCreation, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PersonCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
