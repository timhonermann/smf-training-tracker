package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.TrainingRequirementStatusDto;
import ch.smf.smf_training_tracker_svc.model.TrainingRequirementStatus;
import org.springframework.stereotype.Component;

@Component
public class TrainingRequirementStatusMapper {

  public TrainingRequirementStatusDto toDto(TrainingRequirementStatus status) {
    return switch (status) {
      case MET -> TrainingRequirementStatusDto.MET;
      case ALMOST_MET -> TrainingRequirementStatusDto.ALMOST_MET;
      case UNMET -> TrainingRequirementStatusDto.UNMET;
    };
  }

}
