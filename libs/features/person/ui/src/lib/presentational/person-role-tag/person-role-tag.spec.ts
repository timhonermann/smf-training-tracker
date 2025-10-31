import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonRoleTag } from './person-role-tag';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockPipe } from 'ng-mocks';
import { RoleDisplayTextPipe } from '../../pipe/role-display-text-pipe';
import { role } from '@stt/shared/person/model';

describe('PersonRoleTag', () => {
  let component: PersonRoleTag;
  let fixture: ComponentFixture<PersonRoleTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonRoleTag],
    })
      .overrideComponent(PersonRoleTag, {
        set: {
          imports: [MockPipe(RoleDisplayTextPipe)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PersonRoleTag);
    fixture.componentRef.setInput('role', role.DECOY);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
