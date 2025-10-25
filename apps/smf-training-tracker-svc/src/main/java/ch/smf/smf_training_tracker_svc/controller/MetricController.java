package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.SummaryMetricDto;
import ch.smf.smf_training_tracker_svc.dto.YearlyMetricDto;
import ch.smf.smf_training_tracker_svc.service.MetricService;
import ch.smf.smf_training_tracker_svc.service.YearService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/metrics")
public class MetricController {

  private final MetricService metricService;
  private final YearService yearService;

  @GetMapping("/summary")
  @ResponseStatus(HttpStatus.OK)
  public SummaryMetricDto get() {
    final int currentYear = yearService.getCurrentYear();
    final int previousYear = yearService.getPreviousYear();

    return SummaryMetricDto.builder()
      .currentYear(YearlyMetricDto.builder()
        .year(yearService.getCurrentYear())
        .totalPeopleTrainingRequirementMet(metricService.getCountTrainingRequirementsMet(currentYear))
        .totalPeopleTrainingRequirementAlmostAlmostMet(metricService.getCountTrainingRequirementsAlmostMet(currentYear))
        .totalTrainings(metricService.getTotalTrainings(currentYear))
        .averageParticipants(metricService.getAverageParticipants(currentYear))
        .build())
      .previousYear(YearlyMetricDto.builder()
        .year(yearService.getPreviousYear())
        .totalPeopleTrainingRequirementMet(metricService.getCountTrainingRequirementsMet(previousYear))
        .totalPeopleTrainingRequirementAlmostAlmostMet(metricService.getCountTrainingRequirementsAlmostMet(previousYear))
        .totalTrainings(metricService.getTotalTrainings(previousYear))
        .averageParticipants(metricService.getAverageParticipants(previousYear))
        .build())
      .build();
  }

}
