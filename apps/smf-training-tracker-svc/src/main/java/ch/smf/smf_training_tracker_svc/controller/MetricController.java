package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.MetricDto;
import ch.smf.smf_training_tracker_svc.service.MetricService;
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

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public MetricDto get() {
    return MetricDto.builder()
      .totalTrainingsCurrentYear(metricService.getCountTrainingsCurrentYear())
      .totalTrainingsPreviousYear(metricService.getCountTrainingsPreviousYear())
      .totalPeopleTrainingRequirementReached(metricService.getCountTrainingRequirementsReached())
      .totalPeopleTrainingRequirementAlmostReached(metricService.getCountTrainingRequirementsAlmostReached())
      .build();
  }

}
