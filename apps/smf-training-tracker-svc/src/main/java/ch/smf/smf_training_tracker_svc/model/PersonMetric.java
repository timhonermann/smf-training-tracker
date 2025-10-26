package ch.smf.smf_training_tracker_svc.model;

import ch.smf.smf_training_tracker_svc.entity.Role;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PersonMetric(
  UUID id,
  String firstName,
  String lastName,
  Role role,
  int year,
  int totalTrainings,
  TrainingRequirementStatus trainingRequirementStatus
) {
}
