import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Role, role } from '@stt/shared/person/model';

@Component({
  selector: 'stt-bullet',
  imports: [],
  templateUrl: './bullet.html',
  styleUrl: './bullet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bullet {
  readonly personRole = input.required<Role>();
  protected readonly role = role;
}
