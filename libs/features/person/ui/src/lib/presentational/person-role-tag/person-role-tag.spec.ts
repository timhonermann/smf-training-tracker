import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonRoleTag } from './person-role-tag';

describe('PersonRoleTag', () => {
  let component: PersonRoleTag;
  let fixture: ComponentFixture<PersonRoleTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonRoleTag],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonRoleTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
