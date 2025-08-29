package ch.smf.smf_training_tracker_svc.service;

import ch.smf.smf_training_tracker_svc.entity.TrainingLocation;
import ch.smf.smf_training_tracker_svc.repository.TrainingLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrainingLocationService {

  private final TrainingLocationRepository trainingLocationRepository;

  public TrainingLocation create(TrainingLocation trainingLocation) {
    trainingLocation.setId(UUID.randomUUID());

    return trainingLocationRepository.save(trainingLocation);
  }

  public List<TrainingLocation> findAll() {
    return trainingLocationRepository.findAll();
  }

}
