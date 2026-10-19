package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.TrainingRequirementStatusDto;
import ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus;
import org.springframework.stereotype.Component;

@Component
public class TrainingRequirementStatusMapper {

  public TrainingRequirementStatusDto toDto(TrainingRequirementStatus status) {
    return switch (status) {
      case REACHED -> TrainingRequirementStatusDto.REACHED;
      case ALMOST_REACHED -> TrainingRequirementStatusDto.ALMOST_REACHED;
      case NOT_REACHED -> TrainingRequirementStatusDto.NOT_REACHED;
    };
  }

}
