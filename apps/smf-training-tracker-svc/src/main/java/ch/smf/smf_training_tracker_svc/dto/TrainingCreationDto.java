package ch.smf.smf_training_tracker_svc.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record TrainingCreationDto(
  LocalDate scheduledAt,
  UUID locationId,
  List<UUID> personIds
) {
}
