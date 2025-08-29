package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Builder
public record TrainingDto(
  UUID id,
  LocalDate scheduledAt,
  TrainingLocationDto location,
  Set<PersonDto> people
) {
}
