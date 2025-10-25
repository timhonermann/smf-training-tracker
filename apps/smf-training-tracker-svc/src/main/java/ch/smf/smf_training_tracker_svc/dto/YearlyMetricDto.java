package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

@Builder
public record YearlyMetricDto(
  int year,
  int totalPeopleTrainingRequirementMet,
  int totalPeopleTrainingRequirementAlmostAlmostMet,
  int totalTrainings,
  double averageParticipants
) {
}
