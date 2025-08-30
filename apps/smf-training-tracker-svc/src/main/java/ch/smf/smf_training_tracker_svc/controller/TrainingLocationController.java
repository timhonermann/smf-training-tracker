package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.TrainingLocationDto;
import ch.smf.smf_training_tracker_svc.mapper.TrainingLocationMapper;
import ch.smf.smf_training_tracker_svc.service.TrainingLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/training-locations")
public class TrainingLocationController {

  private final TrainingLocationService trainingLocationService;

  private final TrainingLocationMapper trainingLocationMapper;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TrainingLocationDto create(@RequestBody TrainingLocationDto trainingLocationDto) {
    final var trainingLocation = trainingLocationService.create(trainingLocationMapper.dtoToTrainingLocation(trainingLocationDto));

    return trainingLocationMapper.trainingLocationToDto(trainingLocation);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<TrainingLocationDto> getAll() {
    return trainingLocationService.findAll().stream()
      .map(trainingLocationMapper::trainingLocationToDto)
      .toList();
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable("id") UUID id) {
    trainingLocationService.delete(id);
  }

}
