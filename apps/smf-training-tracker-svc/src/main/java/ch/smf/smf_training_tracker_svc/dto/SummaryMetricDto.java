package ch.smf.smf_training_tracker_svc.dto;

import lombok.Builder;

@Builder
public record SummaryMetricDto(
  YearlyMetricDto currentYear,
  YearlyMetricDto previousYear
) {
}
