import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLayout } from './page-layout';

@Component({
  imports: [PageLayout],
  template: `
    <stt-page-layout>
      <span pageHeader class="title">Title</span>
      <p class="content">Content</p>
    </stt-page-layout>
  `,
})
class Host {}

describe('PageLayout', () => {
  let fixture: ComponentFixture<Host>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
    }).compileComponents();

    fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
  });

  it('should place elements marked pageHeader in the header', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('header .title')).toBeTruthy();
  });

  it('should place the remaining content after the header', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('header .content')).toBeNull();
    expect(element.querySelector('header + .content')).toBeTruthy();
  });
});
