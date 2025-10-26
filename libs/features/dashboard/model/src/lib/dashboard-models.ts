import { PersonData } from '@stt/shared/person/model';

type YearlyMetric = {
  year: number;
  totalPeopleTrainingRequirementMet: number;
  totalPeopleTrainingRequirementAlmostAlmostMet: number;
  totalTrainings: number;
  averageParticipants: number;
};

export type SummaryMetric = {
  currentYear: YearlyMetric;
  previousYear: YearlyMetric;
};

export const trainingRequirementStatus = {
  MET: 'MET',
  ALMOST_MET: 'ALMOST_MET',
  UNMET: 'UNMET',
} as const;

export type TrainingRequirementStatus =
  (typeof trainingRequirementStatus)[keyof typeof trainingRequirementStatus];

export const yearReference = {
  CURRENT: 'CURRENT',
  PREVIOUS: 'PREVIOUS',
};

export type YearReference = (typeof yearReference)[keyof typeof yearReference];

export type PersonTrainingRequirementMetric = PersonData & {
  year: number;
  totalTrainings: number;
  trainingRequirementStatus: TrainingRequirementStatus;
};
