import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListItem } from './person-list-item';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PersonListItem', () => {
  let component: PersonListItem;
  let fixture: ComponentFixture<PersonListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonListItem],
    })
      .overrideComponent(PersonListItem, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PersonListItem);
    fixture.componentRef.setInput('personData', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
