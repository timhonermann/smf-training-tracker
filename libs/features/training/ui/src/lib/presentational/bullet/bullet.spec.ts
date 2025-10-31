import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bullet } from './bullet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { role } from '@stt/shared/person/model';

describe('Bullet', () => {
  let component: Bullet;
  let fixture: ComponentFixture<Bullet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bullet],
    })
      .overrideComponent(Bullet, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Bullet);
    fixture.componentRef.setInput('personRole', role.MEMBER);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
