package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.PersonMetricDto;
import ch.smf.smf_training_tracker_svc.model.PersonMetric;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonMetricMapper {

  private final RoleMapper roleMapper;
  private final TrainingRequirementStatusMapper trainingRequirementStatusMapper;

  public PersonMetricDto mapToDto(final PersonMetric person) {
    return PersonMetricDto.builder()
      .id(person.id())
      .firstName(person.firstName())
      .lastName(person.lastName())
      .role(roleMapper.roleToDto(person.role()))
      .trainingRequirementStatus(trainingRequirementStatusMapper.toDto(person.trainingRequirementStatus()))
      .totalTrainings(person.totalTrainings())
      .year(person.year())
      .build();
  }

}
