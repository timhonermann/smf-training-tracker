package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PersonMetricDto(
  UUID id,
  String firstName,
  String lastName,
  RoleDto role,
  int year,
  int totalTrainings,
  TrainingRequirementStatusDto trainingRequirementStatus
) {
}
