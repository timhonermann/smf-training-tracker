package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

@Builder
public record YearlyMetricDto(
  int year,
  int totalPeopleTrainingRequirementReached,
  int totalPeopleTrainingRequirementAlmostReached,
  int totalTrainings,
  double averageParticipants
) {
}
