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
  private static final int ALMOST_REACHED_REQUIRED_TRAINING_COUNT = REQUIRED_TRAININGS_COUNT - 6;

  private final PersonRepository personRepository;
  private final TrainingRepository trainingRepository;

  public int getCountTrainingRequirementsReached() {
    LocalDate startOfYear = getStartOfYear(getCurrentYear());
    LocalDate endOfYear = getEndOfYear(getCurrentYear());

    return personRepository.countAllByTrainingRequirementsReached(startOfYear, endOfYear, REQUIRED_TRAININGS_COUNT);
  }

  public int getCountTrainingRequirementsAlmostReached() {
    LocalDate startOfYear = getStartOfYear(getCurrentYear());
    LocalDate endOfYear = getEndOfYear(getCurrentYear());

    return personRepository.countAllByTrainingRequirementsReached(startOfYear, endOfYear, ALMOST_REACHED_REQUIRED_TRAINING_COUNT);
  }

  public int getCountTrainingsCurrentYear() {
    return trainingRepository.countAllWithin(getStartOfYear(getCurrentYear()), getEndOfYear(getCurrentYear()));
  }

  public int getCountTrainingsPreviousYear() {
    return trainingRepository.countAllWithin(getStartOfYear(getPreviousYear()), getEndOfYear(getPreviousYear()));
  }

  private int getCurrentYear() {
    return LocalDate.now().getYear();
  }

  private int getPreviousYear() {
    return LocalDate.now().getYear() - 1;
  }

  private LocalDate getStartOfYear(int year) {
    return LocalDate.of(year, 1, 1);
  }

  private LocalDate getEndOfYear(int year) {
    return LocalDate.of(year, 12, 31);
  }
}
