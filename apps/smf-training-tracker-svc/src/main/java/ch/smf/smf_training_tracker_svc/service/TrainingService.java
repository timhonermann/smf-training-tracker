package ch.smf.smf_training_tracker_svc.service;

import ch.smf.smf_training_tracker_svc.entity.Training;
import ch.smf.smf_training_tracker_svc.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrainingService {

  private final TrainingRepository trainingRepository;

  public Training create(final Training training) {
    training.setId(UUID.randomUUID());

    return trainingRepository.save(training);
  }

  public List<Training> findAll() {
    return trainingRepository.findAll().stream()
      .sorted(Comparator.comparing(Training::getScheduledAt).reversed())
      .toList();
  }

  public void delete(final UUID id) {
    trainingRepository.deleteById(id);
  }

}
