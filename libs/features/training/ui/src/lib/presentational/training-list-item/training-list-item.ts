import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TrainingData } from '@stt/features/training/model';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { PersonList } from '../person-list/person-list';

@Component({
  selector: 'stt-training-list-item',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    DatePipe,
    PersonList,
  ],
  templateUrl: './training-list-item.html',
  styleUrl: './training-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingListItem {
  readonly item = input.required<TrainingData>();
}
