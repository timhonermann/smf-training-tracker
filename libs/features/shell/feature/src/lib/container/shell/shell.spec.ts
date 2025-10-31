import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shell } from './shell';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { expect } from 'vitest';

describe('Shell', () => {
  let component: Shell;
  let fixture: ComponentFixture<Shell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shell],
    })
      .overrideComponent(Shell, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Shell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('menuItems', () => {
    expect(component.menuItems()).toMatchSnapshot();
  });
});
