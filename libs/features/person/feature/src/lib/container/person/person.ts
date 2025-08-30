import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'stt-person',
  imports: [],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Person {}
