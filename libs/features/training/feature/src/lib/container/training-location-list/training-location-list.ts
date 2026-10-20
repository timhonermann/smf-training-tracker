import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
} from '@angular/material/list';
import { BackButton, Button } from '@stt/shared/button/ui';
import { TrainingLocationStore } from '@stt/features/training/domain';
import { featureRoutes } from '@stt/shared/routing/model';
import { PageTitle, Tile } from '@stt/shared/page/ui';

@Component({
  selector: 'stt-training-location-list',
  imports: [
    Button,
    BackButton,
    MatDivider,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    PageTitle,
    Tile,
  ],
  templateUrl: './training-location-list.html',
  styleUrl: './training-location-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLocationList {
  readonly store = inject(TrainingLocationStore);

  readonly backLink = signal(`/${featureRoutes.TRAINING}`).asReadonly();
}
