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
import java.util.function.BiFunction;

import static ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus.ALMOST_REACHED_MIN_TRAININGS;
import static ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus.REACHED_MIN_TRAININGS;

@Service
@RequiredArgsConstructor
public class MetricService {

  private final PersonRepository personRepository;
  private final TrainingRepository trainingRepository;

  public int getTotalTrainings(final int year) {
    return withinYear(year, trainingRepository::countAllWithin);
  }

  public double getAverageParticipants(final int year) {
    return withinYear(year, trainingRepository::averageParticipantsWithin);
  }

  /** Counts the People who reached their Training Requirement in the given year. */
  public int countPeopleReached(final int year) {
    return withinYear(year, (startOfYear, endOfYear) -> personRepository.countAllByTrainingCountWithin(
      startOfYear, endOfYear, REACHED_MIN_TRAININGS, Integer.MAX_VALUE));
  }

  /** Counts the People who almost reached their Training Requirement in the given year. */
  public int countPeopleAlmostReached(final int year) {
    return withinYear(year, (startOfYear, endOfYear) -> personRepository.countAllByTrainingCountWithin(
      startOfYear, endOfYear, ALMOST_REACHED_MIN_TRAININGS, REACHED_MIN_TRAININGS));
  }

  public List<PersonMetric> findPeopleInclTrainingMetricWithinPeriod(final int year) {
    final var personMetricQueryResult = withinYear(year, personRepository::findPeopleInclTrainingMetricWithinPeriod);

    return personMetricQueryResult.stream()
      .map(qr -> personMetricQueryResultToPersonMetric(qr, year))
      .toList();
  }

  /** Runs a query over the calendar year, from January 1 to December 31 inclusive. */
  private <T> T withinYear(final int year, final BiFunction<LocalDate, LocalDate, T> query) {
    return query.apply(LocalDate.of(year, 1, 1), LocalDate.of(year, 12, 31));
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
