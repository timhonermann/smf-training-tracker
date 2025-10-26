package ch.smf.smf_training_tracker_svc.model;

import ch.smf.smf_training_tracker_svc.entity.Role;

import java.util.UUID;

public record PersonMetricQueryResult(
  UUID id,
  String firstName,
  String lastName,
  Role role,
  Long totalTrainings
) {
}
