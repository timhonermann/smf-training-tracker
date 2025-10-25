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
