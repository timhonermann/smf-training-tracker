package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record TrainingLocationDto(
  UUID id,
  String name
) {
}
