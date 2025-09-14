package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.TrainingCreationDto;
import ch.smf.smf_training_tracker_svc.dto.TrainingDto;
import ch.smf.smf_training_tracker_svc.mapper.TrainingMapper;
import ch.smf.smf_training_tracker_svc.service.TrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trainings")
public class TrainingController {

  private final TrainingService trainingService;

  private final TrainingMapper trainingMapper;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TrainingDto create(@RequestBody TrainingCreationDto trainingCreationDto) {
    final var training = trainingService.create(trainingMapper.creationDtoToTraining(trainingCreationDto));

    return trainingMapper.trainingToDto(training);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<TrainingDto> findAll() {
    return trainingService.findAll().stream()
      .map(trainingMapper::trainingToDto)
      .toList();
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable UUID id) {
    trainingService.delete(id);
  }
}
