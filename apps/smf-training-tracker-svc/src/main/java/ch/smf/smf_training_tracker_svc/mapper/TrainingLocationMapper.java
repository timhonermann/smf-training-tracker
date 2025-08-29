package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.TrainingLocationDto;
import ch.smf.smf_training_tracker_svc.entity.TrainingLocation;
import org.springframework.stereotype.Component;

@Component
public class TrainingLocationMapper {

  public TrainingLocationDto trainingLocationToDto(TrainingLocation trainingLocation) {
    return TrainingLocationDto.builder()
      .id(trainingLocation.getId())
      .name(trainingLocation.getName())
      .build();
  }

  public TrainingLocation dtoToTrainingLocation(TrainingLocationDto trainingLocationDto) {
    return TrainingLocation.builder()
      .id(trainingLocationDto.id())
      .name(trainingLocationDto.name())
      .build();
  }

}
