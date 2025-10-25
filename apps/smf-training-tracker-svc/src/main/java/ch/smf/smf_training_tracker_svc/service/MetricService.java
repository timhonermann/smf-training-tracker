package ch.smf.smf_training_tracker_svc.service;

import ch.smf.smf_training_tracker_svc.repository.PersonRepository;
import ch.smf.smf_training_tracker_svc.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MetricService {

  private static final int REQUIRED_TRAININGS_COUNT = 26;
  private static final int ALMOST_MET_REQUIRED_TRAINING_COUNT = REQUIRED_TRAININGS_COUNT - 6;

  private final PersonRepository personRepository;
  private final TrainingRepository trainingRepository;

  public int getTotalTrainings(final int year) {
    return trainingRepository.countAllWithin(getStartOfYear(year), getEndOfYear(year));
  }

  public double getAverageParticipants(final int year) {
    return trainingRepository.averageParticipantsWithin(getStartOfYear(year), getEndOfYear(year));
  }

  public int getCountTrainingRequirementsMet(final int year) {
    LocalDate startOfYear = getStartOfYear(year);
    LocalDate endOfYear = getEndOfYear(year);

    return personRepository.countAllByTrainingsLimitMet(startOfYear, endOfYear, REQUIRED_TRAININGS_COUNT);
  }

  public int getCountTrainingRequirementsAlmostMet(final int year) {
    LocalDate startOfYear = getStartOfYear(year);
    LocalDate endOfYear = getEndOfYear(year);

    return personRepository.countAllByTrainingsLimitMet(startOfYear, endOfYear, ALMOST_MET_REQUIRED_TRAINING_COUNT);
  }

  private LocalDate getStartOfYear(int year) {
    return LocalDate.of(year, 1, 1);
  }

  private LocalDate getEndOfYear(int year) {
    return LocalDate.of(year, 12, 31);
  }
}
