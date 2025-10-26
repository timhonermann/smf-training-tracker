package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.PersonMetricDto;
import ch.smf.smf_training_tracker_svc.dto.SummaryMetricDto;
import ch.smf.smf_training_tracker_svc.dto.YearReference;
import ch.smf.smf_training_tracker_svc.dto.YearlyMetricDto;
import ch.smf.smf_training_tracker_svc.mapper.PersonMetricMapper;
import ch.smf.smf_training_tracker_svc.service.DateService;
import ch.smf.smf_training_tracker_svc.service.MetricService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/metrics")
public class MetricController {

  private final MetricService metricService;
  private final DateService dateService;

  private final PersonMetricMapper personMetricMapper;

  @GetMapping("/summary")
  @ResponseStatus(HttpStatus.OK)
  public SummaryMetricDto getSummary() {
    final int currentYear = dateService.getCurrentYear();
    final int previousYear = dateService.getPreviousYear();

    return SummaryMetricDto.builder()
      .currentYear(YearlyMetricDto.builder()
        .year(dateService.getCurrentYear())
        .totalPeopleTrainingRequirementMet(metricService.getCountTrainingRequirementsMet(currentYear))
        .totalPeopleTrainingRequirementAlmostAlmostMet(metricService.getCountTrainingRequirementsAlmostMet(currentYear))
        .totalTrainings(metricService.getTotalTrainings(currentYear))
        .averageParticipants(metricService.getAverageParticipants(currentYear))
        .build())
      .previousYear(YearlyMetricDto.builder()
        .year(dateService.getPreviousYear())
        .totalPeopleTrainingRequirementMet(metricService.getCountTrainingRequirementsMet(previousYear))
        .totalPeopleTrainingRequirementAlmostAlmostMet(metricService.getCountTrainingRequirementsAlmostMet(previousYear))
        .totalTrainings(metricService.getTotalTrainings(previousYear))
        .averageParticipants(metricService.getAverageParticipants(previousYear))
        .build())
      .build();
  }

  @GetMapping("/training-requirements")
  @ResponseStatus(HttpStatus.OK)
  public List<PersonMetricDto> getTrainingRequirements(@RequestParam YearReference yearReference) {
    final int year = switch (yearReference) {
      case CURRENT -> dateService.getCurrentYear();
      case PREVIOUS -> dateService.getPreviousYear();
    };
    final var personMetrics = metricService.findPeopleInclTrainingMetricWithinPeriod(year);

    return personMetrics.stream()
      .map(personMetricMapper::mapToDto)
      .toList();
  }

}
