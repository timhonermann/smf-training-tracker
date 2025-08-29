package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

@Builder
public record SettingsDto(
  Integer periodStartDay,
  Integer periodStartMonth,
  Integer periodEndDay,
  Integer periodEndMonth
) {
}
