package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

@Builder
public record MetricDto(
  int totalTrainingsCurrentYear,
  int totalTrainingsPreviousYear,
  int totalPeopleTrainingRequirementReached,
  int totalPeopleTrainingRequirementAlmostReached
) {
}
