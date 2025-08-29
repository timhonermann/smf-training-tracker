package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.TrainingDto;
import ch.smf.smf_training_tracker_svc.entity.Training;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TrainingMapper {

  private final PersonMapper personMapper;
  private final TrainingLocationMapper locationMapper;

  public Training dtoToTraining(TrainingDto trainingDto) {
    return Training.builder()
      .id(trainingDto.id())
      .scheduledAt(trainingDto.scheduledAt())
      .location(locationMapper.dtoToTrainingLocation(trainingDto.location()))
      .people(personMapper.dtoToPerson(trainingDto.people()))
      .build();
  }

  public TrainingDto trainingToDto(Training training) {
    return TrainingDto.builder()
      .id(training.getId())
      .scheduledAt(training.getScheduledAt())
      .location(locationMapper.trainingLocationToDto(training.getLocation()))
      .people(personMapper.personToDto(training.getPeople()))
      .build();
  }

}
