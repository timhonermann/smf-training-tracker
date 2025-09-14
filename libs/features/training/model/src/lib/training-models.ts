import { TrainingLocationData } from './training-location-models';
import { PersonData } from '@stt/shared/person/model';

export type TrainingData = {
  id: string;
  scheduledAt: Date;
  location: TrainingLocationData;
  people: PersonData[]
};

export type TrainingCreationData = {
  scheduledAt: Date;
  locationId: string;
  personIds: string[];
}
