import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButton } from './back-button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockDirective } from 'ng-mocks';
import { RouterLink } from '@angular/router';

describe('BackButton', () => {
  let component: BackButton;
  let fixture: ComponentFixture<BackButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButton],
    })
      .overrideComponent(BackButton, {
        set: {
          imports: [MockDirective(RouterLink)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BackButton);
    fixture.componentRef.setInput('link', '');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
