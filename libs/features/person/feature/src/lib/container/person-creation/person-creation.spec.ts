import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonCreation } from './person-creation';

describe('PersonCreation', () => {
  let component: PersonCreation;
  let fixture: ComponentFixture<PersonCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
