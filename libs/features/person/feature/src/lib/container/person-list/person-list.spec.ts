import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonList } from './person-list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';
import { PersonStore } from '@stt/features/person/domain';

describe('PersonList', () => {
  let component: PersonList;
  let fixture: ComponentFixture<PersonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonList],
      providers: [
        MockProvider(PersonStore, {
          entities: vi.fn(),
        }),
      ],
    })
      .overrideComponent(PersonList, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PersonList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
