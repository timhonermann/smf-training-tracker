import { PersonData } from '@stt/shared/person/model';

export type YearlyMetric = {
  year: number;
  totalPeopleTrainingRequirementReached: number;
  totalPeopleTrainingRequirementAlmostReached: number;
  totalTrainings: number;
  averageParticipants: number;
};

export type SummaryMetric = {
  currentYear: YearlyMetric;
  previousYear: YearlyMetric;
};

export const trainingRequirementStatus = {
  REACHED: 'REACHED',
  ALMOST_REACHED: 'ALMOST_REACHED',
  NOT_REACHED: 'NOT_REACHED',
} as const;

export type TrainingRequirementStatus =
  (typeof trainingRequirementStatus)[keyof typeof trainingRequirementStatus];

export const yearReference = {
  CURRENT: 'CURRENT',
  PREVIOUS: 'PREVIOUS',
} as const;

export type YearReference = (typeof yearReference)[keyof typeof yearReference];

export type YearReferenceParam = Lowercase<YearReference>;

export const yearReferenceParam: Record<
  keyof typeof yearReference,
  YearReferenceParam
> = {
  CURRENT: 'current',
  PREVIOUS: 'previous',
};

export type PersonTrainingRequirementMetric = PersonData & {
  year: number;
  totalTrainings: number;
  trainingRequirementStatus: TrainingRequirementStatus;
};

export const YEAR_REFERENCE_PARAM_NAME = 'year';
