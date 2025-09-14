package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.TrainingCreationDto;
import ch.smf.smf_training_tracker_svc.dto.TrainingDto;
import ch.smf.smf_training_tracker_svc.entity.Person;
import ch.smf.smf_training_tracker_svc.entity.Training;
import ch.smf.smf_training_tracker_svc.entity.TrainingLocation;
import ch.smf.smf_training_tracker_svc.repository.PersonRepository;
import ch.smf.smf_training_tracker_svc.repository.TrainingLocationRepository;
import ch.smf.smf_training_tracker_svc.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TrainingMapper {

  private final TrainingLocationRepository trainingLocationRepository;
  private final PersonRepository personRepository;

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

  public Training creationDtoToTraining(TrainingCreationDto trainingCreationDto) {
    final int providedPeopleCount = trainingCreationDto.personIds().size();
    final int peopleCount = personRepository.countByIdIn(trainingCreationDto.personIds());

    if (providedPeopleCount != peopleCount) {
      throw new IllegalArgumentException("One or more provided people IDs do not exist");
    }

    final TrainingLocation location = trainingLocationRepository.getReferenceById(trainingCreationDto.locationId());
    final Set<Person> people = trainingCreationDto.personIds().stream()
      .map(personRepository::getReferenceById)
      .collect(Collectors.toSet());

    return Training.builder()
      .scheduledAt(trainingCreationDto.scheduledAt())
      .location(location)
      .people(people)
      .build();
  }

}
