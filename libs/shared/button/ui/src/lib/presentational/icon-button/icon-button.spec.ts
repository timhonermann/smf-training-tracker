import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButton } from './icon-button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('IconButton', () => {
  let component: IconButton;
  let fixture: ComponentFixture<IconButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButton],
    })
      .overrideComponent(IconButton, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(IconButton);
    fixture.componentRef.setInput('icon', 'add');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
