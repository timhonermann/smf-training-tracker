import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'stt-person',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Person {}
