import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
    })
      .overrideComponent(Menu, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Menu);
    fixture.componentRef.setInput('menuItems', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
