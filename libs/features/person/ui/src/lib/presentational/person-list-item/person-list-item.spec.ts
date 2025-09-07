import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListItem } from './person-list-item';

describe('PersonListItem', () => {
  let component: PersonListItem;
  let fixture: ComponentFixture<PersonListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
