import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The frame every page sits in: a centered column with the elements marked
 * `pageHeader` stacked at the top and the rest of the content below.
 */
@Component({
  selector: 'stt-page-layout',
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayout {}
