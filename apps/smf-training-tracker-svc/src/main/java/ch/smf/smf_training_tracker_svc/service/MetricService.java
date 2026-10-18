package ch.smf.smf_training_tracker_svc.service;

import ch.smf.smf_training_tracker_svc.model.PersonMetric;
import ch.smf.smf_training_tracker_svc.model.PersonMetricQueryResult;
import ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus;
import ch.smf.smf_training_tracker_svc.repository.PersonRepository;
import ch.smf.smf_training_tracker_svc.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus.ALMOST_REACHED_MIN_TRAININGS;
import static ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus.REACHED_MIN_TRAININGS;

@Service
@RequiredArgsConstructor
public class MetricService {

  private final PersonRepository personRepository;
  private final TrainingRepository trainingRepository;

  public int getTotalTrainings(final int year) {
    return trainingRepository.countAllWithin(getStartOfYear(year), getEndOfYear(year));
  }

  public double getAverageParticipants(final int year) {
    return trainingRepository.averageParticipantsWithin(getStartOfYear(year), getEndOfYear(year));
  }

  public int getCountTrainingRequirementsReached(final int year) {
    LocalDate startOfYear = getStartOfYear(year);
    LocalDate endOfYear = getEndOfYear(year);

    return personRepository.countAllByTrainingCountWithin(
      startOfYear, endOfYear, REACHED_MIN_TRAININGS, Integer.MAX_VALUE);
  }

  public int getCountTrainingRequirementsAlmostReached(final int year) {
    LocalDate startOfYear = getStartOfYear(year);
    LocalDate endOfYear = getEndOfYear(year);

    return personRepository.countAllByTrainingCountWithin(
      startOfYear, endOfYear, ALMOST_REACHED_MIN_TRAININGS, REACHED_MIN_TRAININGS);
  }

  public List<PersonMetric> findPeopleInclTrainingMetricWithinPeriod(final int year) {
    LocalDate startOfYear = getStartOfYear(year);
    LocalDate endOfYear = getEndOfYear(year);
    final var personMetricQueryResult = personRepository.findPeopleInclTrainingMetricWithinPeriod(startOfYear, endOfYear);

    return personMetricQueryResult.stream()
      .map(qr -> personMetricQueryResultToPersonMetric(qr, year))
      .toList();
  }

  private LocalDate getStartOfYear(int year) {
    return LocalDate.of(year, 1, 1);
  }

  private LocalDate getEndOfYear(int year) {
    return LocalDate.of(year, 12, 31);
  }

  private PersonMetric personMetricQueryResultToPersonMetric(final PersonMetricQueryResult personMetricQueryResult, final int year) {
    final var status = TrainingRequirementStatus.fromTrainingCount(Math.toIntExact(personMetricQueryResult.totalTrainings()));

    return PersonMetric.builder()
      .id(personMetricQueryResult.id())
      .firstName(personMetricQueryResult.firstName())
      .lastName(personMetricQueryResult.lastName())
      .role(personMetricQueryResult.role())
      .totalTrainings(Math.toIntExact(personMetricQueryResult.totalTrainings()))
      .trainingRequirementStatus(status)
      .year(year)
      .build();
  }
}
