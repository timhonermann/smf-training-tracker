import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItem } from './menu-item';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockDirective } from 'ng-mocks';
import { RouterLink } from '@angular/router';

describe('MenuItem', () => {
  let component: MenuItem;
  let fixture: ComponentFixture<MenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItem],
    })
      .overrideComponent(MenuItem, {
        set: {
          imports: [MockDirective(RouterLink)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MenuItem);
    fixture.componentRef.setInput('item', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
