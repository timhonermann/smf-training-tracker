import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'stt-page-title',
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitle {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
